export interface ConversationProps {
  id: number;
  title: string;
  selectedModel: string;
  createdAt: string;
  updatedAt: string;
  providerId: number;
}

export interface ProviderProps {
  id: number;
  name: string;
  title?: string;
  desc?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  models: string[];
}

export type MessageStatus = 'loading' | 'streaming' | 'finished' | 'error';

export interface MessageProps {
  id: number;
  content: string;
  type: 'question' | 'answer';
  conversationId: number;
  status?: MessageStatus;
  createdAt: string;
  updatedAt: string;
  imagePath?: string;
}

export interface ChatMessageProps {
  role: string; 
  content: string;
  imagePath?: string;
}

export interface ChatMessage {
  role: string;
  content: string;
  imagePath?: string;
}

export interface CreateChatProps {
  messages: ChatMessage[];
  providerName: string;
  selectedModel: string;
  messageId: number;
}

export interface UpdatedStreamData {
  messageId: number;
  data: {
    is_end: boolean;
    result: string;
    is_error?: boolean;
  }
}
export type OnUpdatedCallback = (data: UpdatedStreamData) => void;

export interface MessageListInstance {
  ref: HTMLDivElement
}

export interface OpenFileOptions {
  withDataUrl?: boolean;
}

export interface OpenFileResult {
  filePaths: string[];
  dataUrls?: string[];
  errorMsg?: string;
}
