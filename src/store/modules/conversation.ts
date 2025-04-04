import { defineStore } from 'pinia';
import { ConversationProps } from '@/types/index';
import { db } from '../indexDB';

export interface ConversationStore {
  items: ConversationProps[];
  selectedId: number;
}

export const useConversationStore = defineStore('conversation', {
  state: (): ConversationStore => ({
    items: [],
    selectedId: -1,
  }),
  actions: {
    async fetchConversations() {
      this.items = await db.conversations.toArray();
    },
    async createConversation(createdData: Omit<ConversationProps, 'id'>) {
      const newConversationId = await db.conversations.add(createdData);
      this.items.push({
        ...createdData,
        id: newConversationId,
      });
      return newConversationId;
    },
  },
  getters: {
    totalConversations: (state) => state.items.length,
    getConversationById: (state) => (id: number) => state.items.find((item) => item.id === id),
  },
});
