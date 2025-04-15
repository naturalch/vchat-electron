import { CreateChatProps, OnUpdatedCallback, AppConfig, OpenFileOptions, OpenFileResult } from './index';

export interface IElectronAPI {
  startChat: (data: CreateChatProps) => void;
  onUpdateMessage: (callback: OnUpdatedCallback) => any;
  openFileDialog: (options?: OpenFileOptions) => Promise<OpenFileResult>;
  copyImageToUserDir: (sourcePath: string) => Promise<string>;
  onDeleteConversation: (callback: (id: number) => void) => void;
  getConfig: () => Promise<AppConfig>;
  updateConfig: (config: Partial<AppConfig>) => Promise<AppConfig>;
  onMenuEvent: (callback: (type: string) => void) => void;
  showContextMenu: (id: number) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
