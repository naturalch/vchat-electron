import { app, BrowserWindow, protocol, net } from 'electron';
import path from 'path';
import 'dotenv/config';
import { setupIPC } from './ipc';
import url from 'node:url';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// TODO: 应用配置
const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 750,
    minHeight: 562,
    webPreferences: {
      webSecurity: true, // 启用/禁用浏览器的同源策略
      nodeIntegration: false,  // 允许渲染进程直接使用 Node.js API
      contextIsolation: true, // 控制渲染进程的 JavaScript 上下文是否与 Electron 内部上下文隔离
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  
  setupIPC(mainWindow);

  protocol.handle('safe-file', async (request) => {
    // 转换自定义文件路径的协议及转义符号，转为实际文件路径
    const filePath = decodeURIComponent(request.url.replace('safe-file://', ''));
    // const data = fs.readFileSync(filePath);
    // return new Response(data, {
    //   status: 200,
    //   headers: {
    //     'Content-Type': lookup(filePath) as string,
    //   },
    // });
    // 转换实际文件路径为file协议及转义符号的路径
    const newFilePath = url.pathToFileURL(filePath).toString();
    return net.fetch(newFilePath);
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
