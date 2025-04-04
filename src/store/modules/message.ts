import { defineStore } from 'pinia';
import { db } from '../indexDB';
import { MessageProps } from '@/types/index';

export interface MessageStore {
  items: MessageProps[]
}

export const useMessageStore = defineStore('message', {
  state: (): MessageStore => ({
    items: [],
  }),
  actions: {
    async fetchMessagesByConversation(conversationId: number) {
      const items = await db.messages.where({ conversationId }).toArray();
      this.items = items;
    },
    async createMessage(createdData: Omit<MessageProps, 'id'>) {
      const newMessageId = await db.messages.add(createdData);
      this.items.push({ id: newMessageId, ...createdData });
      return newMessageId;
    },
    async updateMessage(messageId: number, updatedData: Partial<MessageProps>) {
      const currentMessage = this.items.find((item) => item.id === messageId);
      if (currentMessage) {
        await db.messages.update(messageId, updatedData);
        const index = this.items.findIndex((item) => item.id === messageId);
        if (index > -1) {
          this.items[index] = { ...this.items[index], ...updatedData };
        }
      }
    },
  },
  getters: {
    getLastQuestion: (state) => (conversationId: number) => {
      return state.items.findLast((item) => item.conversationId === conversationId && item.type === 'question');
    },
    isMessageLoading: (state) => state.items.some((item) => item.status === 'loading' || item.status === 'streaming'),
  },
});
