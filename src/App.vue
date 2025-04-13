<template>
  <div class="h-screen flex items-center justify-between">
    <div class="h-full w-[300px] border-r bg-white">
      <div class="h-[90%] overflow-y-auto">
        <ConversationList :list="conversationItems" />
      </div>
      <div
        class="h-[10%] grid grid-cols-2 gap-2 p-2 items-center
        bg-white border-gray-300 border-t"
      >
        <router-link to="/settings">
          <IButton
            icon-name="radix-icons:gear"
            plain
            class="w-full"
          >
            应用配置
          </IButton>
        </router-link>
        <router-link to="/">
          <IButton
            icon-name="radix-icons:chat-bubble"
            class="w-full"
          >
            新建聊天
          </IButton>
        </router-link>
      </div>
    </div>

    <div class="h-full flex-1 min-w-[388px]">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ConversationList from '@/components/Conversation/ConversationList.vue';
import IButton from '@/components/IButton/index.vue';
import { initProviders } from '@/store/indexDB';
import { useConversationStore  } from '@/store/modules/conversation';
import { useProviderStore } from '@/store/modules/provider';
import { initI18n } from './i18n';

console.log('👋 This message is being logged by "App.vue", included via Vite');

const providerStore = useProviderStore();
const conversationStore = useConversationStore();
const conversationItems = computed(() => conversationStore.items);

onMounted(async () => {
  await initI18n();
  await initProviders();
  providerStore.fetchProviders();
  conversationStore.fetchConversations();
});
</script>
