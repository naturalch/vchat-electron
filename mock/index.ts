import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';
import { ConversationProps, ProviderProps, MessageProps } from '@/types/index';

export const Conversations: ConversationProps[] = Mock.mock([
  {
    id: 1,
    selectedModel: 'qwen-turbo',
    title: 'ESLint 规则配置1',
    createdAt: '@date("yyyy-MM-dd")',
    updatedAt: '@date("yyyy-MM-dd")',
    providerId: 1,
  },
  {
    id: 2,
    selectedModel: 'ERNIE-Speed-128K',
    title: 'ESLint 规则配置1',
    createdAt: '@date("yyyy-MM-dd")',
    updatedAt: '@date("yyyy-MM-dd")',
    providerId: 2,
  },
  {
    id: 3,
    selectedModel: 'qwen-plus',
    title: 'ESLint 规则配置2',
    createdAt: '@date("yyyy-MM-dd")',
    updatedAt: '@date("yyyy-MM-dd")',
    providerId: 1,
  },
]);

export const Providers: ProviderProps[] = Mock.mock([
  {     
    id: 1,
    name: 'dashscope',
    title: '阿里灵积',
    desc: '通义千问 阿里出品的大模型',
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg',
    createdAt: '@date("yyyy-MM-dd")',
    updatedAt: '@date("yyyy-MM-dd")',
  },
  {     
    id: 2,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-Speed-128K', 'ERNIE-4.0-8K', 'ERNIE-3.5-8K'],
    avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
    createdAt: '@date("yyyy-MM-dd")',
    updatedAt: '@date("yyyy-MM-dd")',
  },
  // {     
  //   id: 3,
  //   name: 'openai',
  //   title: 'OpenAI',
  //   desc: 'OpenAI GPT系列模型',
  //   models: ['GPT-4', 'GPT-3.5-Turbo'],
  //   avatar: '@image("200x200")',
  //   createdAt: '@date("yyyy-MM-dd")',
  //   updatedAt: '@date("yyyy-MM-dd")',
  // },
  // {     
  //   id: 4,
  //   name: 'deepseek',
  //   title: 'DeepSeek',
  //   desc: 'DeepSeek AI大模型',
  //   models: ['deepseek-chat', 'deepseek-R1'],
  //   avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4981273-200-phhqenmywlkiybehuaqvsxpfekviajex.jpeg',
  //   createdAt: '@date("yyyy-MM-dd")',
  //   updatedAt: '@date("yyyy-MM-dd")',
  // },
]);

export const Messages: MessageProps[] = Mock.mock([
  { id: 1, content: '如何配置ESLint规则', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 1 },
  { id: 2, content: '你的说法很正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 3, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 4, content: '你的说法很正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 5, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 6, content: '你的说法很正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 7, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 1 },
  { id: 8, content: '你的说法很正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 1 },
  { id: 9, content: '还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 1 },
  { id: 10, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 1 },
  { id: 11, content: '2 如何配置ESLint规则', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'question', conversationId: 2 },
  { id: 12, content: '你的说法很正确', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 13, content: '请告诉我更多', createdAt: '2024-07-03',updatedAt: '2024-07-03',  type: 'question', conversationId: 2 },
  { id: 14, content: '你的说法很正确，理解的很不错,你的说法很正确，理解的很不错', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', conversationId: 2 },
  { id: 15, content: '3 还有更多的信息吗', createdAt: '2024-07-03', type: 'question', updatedAt: '2024-07-03', conversationId: 3 },
  { id: 16, content: '', createdAt: '2024-07-03', updatedAt: '2024-07-03', type: 'answer', status: 'loading', conversationId: 3 },
]);

export default [
  {
    url: '/api/conversations/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: Conversations ?? [],
          total: Conversations.length ?? 0,
        },
      };
    },
  },
  {
    url: '/api/providers/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: Providers,
          total: Providers.length,
        },
      };
    },
  },
  {
    url: '/api/messages/list',
    method: 'get',
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: {
          list: Messages,
          total: Messages.length,
        },
      };
    },
  },
] as MockMethod[];
