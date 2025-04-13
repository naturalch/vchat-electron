import { ipcMain, BrowserWindow, app, dialog } from 'electron';
import { CreateChatProps, OpenFileOptions, OpenFileResult, UpdatedStreamData, AppConfig } from './types/index';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { createProvider } from './providers/createProvider';
import { configManager } from './config';

export function setupIPC(mainWindow: BrowserWindow) {
  ipcMain.on('start-chat', async (event, data: CreateChatProps) => {
    console.log('hey', data);
    const { providerName, messages, messageId, selectedModel } = data;
    
    const provider = createProvider(providerName);
    const stream = await provider.chat(messages, selectedModel);
    for await (const chunk of stream) {
      const content: UpdatedStreamData = { messageId, data: chunk };
      mainWindow.webContents.send('update-message', content);
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
  
  ipcMain.handle('get-config', () => {
    return configManager.get();
  });

  ipcMain.handle('update-config', async (event, newConfig: Partial<AppConfig>) => {
    console.log('on update config', newConfig);
    const updatedConfig = await configManager.update(newConfig);
    return updatedConfig;
  });
}
