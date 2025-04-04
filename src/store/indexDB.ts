import { Dexie, type EntityTable } from 'dexie';
import { ProviderProps, ConversationProps, MessageProps } from '@/types/index';
import { Providers } from '../../mock/index';

export const db = new Dexie('vChatDatabase') as Dexie & {
  providers: EntityTable<ProviderProps, 'id'>;
  conversations: EntityTable<ConversationProps, 'id'>;
  messages: EntityTable<MessageProps,'id'>;
};

db.version(1).stores({
  providers: '++id, name',
  conversations: '++id, providerId',
  messages: '++id, conversationId',
});

export const initProviders = async () => {
  if ((await db.providers.count()) === 0) {
    db.providers.bulkAdd(Providers);
  }
};
