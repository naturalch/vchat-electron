import { ipcMain, BrowserWindow } from 'electron';
import { CreateChatProps, UpdatedStreamData } from './types/index';
import { ChatCompletion } from '@baiducloud/qianfan';
import 'dotenv/config';
import OpenAI from 'openai';

// TODO: 模型扩展
export function setupIPC(mainWindow: BrowserWindow) {
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data);
    const { providerName, messages, messageId, selectedModel } = data;
    if (providerName === 'qianfan') {
      const client = new ChatCompletion();
      const stream: any = await client.chat({
        messages: messages as any,
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
        messages: messages as any,
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
}
