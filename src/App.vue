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
            {{ $t('app.settings') }}
          </IButton>
        </router-link>
        <router-link to="/">
          <IButton
            icon-name="radix-icons:chat-bubble"
            class="w-full"
          >
            {{ $t('app.newChat') }}
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

const router = useRouter();

const providerStore = useProviderStore();

const conversationStore = useConversationStore();
const conversationItems = computed(() => conversationStore.items);

// 初始化通用配置
const initSettings = async () => {
  const config = await window.electronAPI.getConfig();
  await initI18n(config.language);
  document.documentElement.style.setProperty('--font-size', `${config.fontSize}px`);
};

// 处理菜单事件
const handleMenuEvents = () => {
  window.electronAPI.onMenuEvent((type: string) => {
    switch (type) {
      case 'menu-new-conversation':
        router.push('/');
        break;
      case 'menu-open-settings':
        router.push('/settings');
        break;
    }
  });
};

onMounted(async () => {
  await initSettings();
  await initProviders();
  providerStore.fetchProviders();
  conversationStore.fetchConversations();
  handleMenuEvents();
});
</script>
