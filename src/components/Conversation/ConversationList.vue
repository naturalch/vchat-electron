<template>
  <div class="conversation-list">
    <template v-if="list?.length">
      <div
        v-for="item in list"
        :key="item.id"
        class="item border-gray-300 border-b cursor-pointer hover:bg-green-50 px-4 py-2"
        :class="{
          'bg-green-50': item.id === conversationStore.selectedId,
          'bg-white': item.id !== conversationStore.selectedId,
        }"
      >
        <a @click="goToConversation(item.id)">
          <div class="flex justify-between items-center text-sm leading-5 text-gray-300">
            <span>{{ item.selectedModel }}</span>
            <span>{{ dayjs(item.updatedAt).format('YYYY-MM-DD') }}</span>
          </div>
          <h2 class="font-semibold leading-7 text-gray-600 truncate">{{ item.title }}</h2>
        </a>
      </div>
    </template>
    <div
      v-else
      class="flex items-center justify-center h-[64px] text-gray-300 p-2"
    >
      暂无对话
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConversationProps } from '@/types/index';
import dayjs from 'dayjs';
import { useConversationStore } from '@/store/modules/conversation';

defineOptions({ name: 'ConversationList' });

defineProps<{ list: ConversationProps[] }>();

const router = useRouter();

const conversationStore = useConversationStore();

const goToConversation = (conversationId: number) => {
  if (!conversationId) {
    return;
  }
  router.push({ name: 'conversation',params: { id: conversationId } });
  conversationStore.selectedId = conversationId;
};
</script>

<style scoped></style>
