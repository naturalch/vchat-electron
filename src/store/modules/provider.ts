import { defineStore } from 'pinia';
import { ProviderProps } from '@/types/index';
import { db } from '../indexDB';

export interface ProviderStore {
  items: ProviderProps[];
}

export const useProviderStore = defineStore('provider', {
  state: (): ProviderStore => ({
    items: [],
  }),
  actions: {
    async fetchProviders() {
      this.items = await db.providers.toArray();
    },
  },
  getters: {
    getProviderById: (state) => (id: number) => state.items.find((item) => item.id === id),
  },
});
