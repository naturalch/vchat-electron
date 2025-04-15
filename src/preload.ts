// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron';
import { CreateChatProps, OnUpdatedCallback, OpenFileOptions, AppConfig } from '@/types/index';
import { IElectronAPI } from '@/types/interface';

contextBridge.exposeInMainWorld('electronAPI', {
  startChat: (data: CreateChatProps) => ipcRenderer.send('start-chat', data),
  onUpdateMessage: (callback: OnUpdatedCallback) => ipcRenderer.on('update-message', (_event, value) => callback(value)),
  openFileDialog: (options?: OpenFileOptions) => ipcRenderer.invoke('open-file-dialog', options),
  copyImageToUserDir: (sourcePath: string) => ipcRenderer.invoke('copy-image-to-user-dir', sourcePath),
  getConfig: () => ipcRenderer.invoke('get-config'),
  updateConfig: (config: Partial<AppConfig>) => ipcRenderer.invoke('update-config', config),
  onMenuEvent: (callback: (type: string) => void) => {
    ipcRenderer.on('menu-event', (_event, type) => callback(type));
  },
  showContextMenu: (id: number) => ipcRenderer.send('show-context-menu', id),
  onDeleteConversation: (callback: (id: number) => void) => ipcRenderer.on('delete-conversation', (_event, id) => callback(id)),
} as IElectronAPI);
