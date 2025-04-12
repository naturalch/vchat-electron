import { ipcMain, BrowserWindow, app, dialog } from 'electron';
import { CreateChatProps, UpdatedStreamData, OpenFileOptions, OpenFileResult } from './types/index';
import { ChatCompletion } from '@baiducloud/qianfan';
import 'dotenv/config';
import OpenAI from 'openai';
import fs from 'node:fs';
import path from 'node:path';
import { convertMessages } from './helper';

// TODO: 模型扩展
export function setupIPC(mainWindow: BrowserWindow) {
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data);
    const { providerName, messages, messageId, selectedModel } = data;
    // TODO: 图片格式 convertedMessages 目前只支持通义
    const convertedMessages = await convertMessages(messages);
    if (providerName === 'qianfan') {
      const client = new ChatCompletion();
      const stream: any = await client.chat({
        messages: convertedMessages as any,
        stream: true,
      }, selectedModel);
      for await (const chunk of stream) {
        const { is_end, result } = chunk;
        const content: UpdatedStreamData = {
          messageId,
          data: {
            is_end,
            result,
          },
        };

        mainWindow.webContents.send('update-message', content);
      }
    } else if (providerName === 'dashscope') {
      const client = new OpenAI({
        apiKey: process.env['DASHSCOPE_API_KEY'],
        baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      });
      const stream = await client.chat.completions.create({
        messages: convertedMessages as any,
        model: selectedModel,
        stream: true,
      });
      for await (const chunk of stream) {
        const choice = chunk.choices[0];
        const content = {
          messageId,
          data: {
            is_end: choice.finish_reason === 'stop',
            result: choice.delta.content || '',
          },
        };
        mainWindow.webContents.send('update-message', content);
      }
    }
  });

  ipcMain.handle('copy-image-to-user-dir', async (event, sourcePath: string) => {
    const userDataPath = app.getPath('userData');
    const imagesDir = path.join(userDataPath, 'images');
    fs.mkdirSync(imagesDir, { recursive: true });
    const fileName = path.basename(sourcePath);
    const targetPath = path.join(imagesDir, fileName);
    fs.copyFileSync(sourcePath, targetPath);
    return targetPath;
  });

  // TODO: 支持 @electron/remote
  ipcMain.handle('open-file-dialog', async (event, options?: OpenFileOptions) => {
    const { filePaths } = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'jpeg', 'gif'] },
      ],
    });
    if (!filePaths || filePaths.length === 0) {
      return { errorMsg: 'No file selected' };
    }

    const result: OpenFileResult = { filePaths };

    if (options?.withDataUrl) {
      const dataUrls = filePaths.map((filePath) => {
        const dataUrl = `data:image/png;base64,${fs.readFileSync(filePath).toString('base64')}`;
        return dataUrl;
      });
      result.dataUrls = dataUrls;
    }

    return result;
  });
}
