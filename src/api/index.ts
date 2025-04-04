import { http } from '@/utils/request';
import { ConversationProps, ProviderProps, MessageProps } from '@/types/index';

export function getConversationsList(params?: object): Promise<{
  list: ConversationProps[];
  total: number;
}> {
  return http.request({
    url: '/conversations/list',
    method: 'get',
    params,
  });
}

export function getProvidersList(params?: object): Promise<{
  list: ProviderProps[];
  total: number;
}> {
  return http.request({
    url: '/providers/list',
    method: 'get',
    params,
  });
}

export function getMessagesList(params?: object): Promise<{
  list: MessageProps[];
  total: number;
}> {
  return http.request({
    url: '/messages/list',
    method: 'get',
    params,
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getListApiError(data?: object): Promise<any> {
  return http.request({
    url: '/message/send',
    method: 'post',
    data,
  });
}
