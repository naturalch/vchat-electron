<template>
  <div class="conversation h-full">
    <div
      v-if="conversation"
      class="h-[5%] bg-green-50 border-b border-green-100 flex items-center px-3 justify-between"
    >
      <h3 class="font-semibold  text-gray-900">
        {{ conversation.title }}
      </h3>
      <span class="text-sm text-gray-500">{{ dayjs(conversation.updatedAt).format('YYYY-MM-DD') }}</span>
    </div>
    <div class="w-[80%] mx-auto h-[80%] overflow-y-auto pt-2">
      <MessageList :messages="filterMessages" />
    </div>
    <div class="w-[80%] mx-auto flex items-center h-[15%]">
      <MessageInput
        v-model="inputValue"
        :disabled="messageStore.isMessageLoading"
        @send="sendNewMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageList from '@/components/MessageList/index.vue';
import MessageInput from '@/components/MessageInput/index.vue';
import { MessageProps, MessageStatus } from '@/types/index';
import dayjs from 'dayjs';
import { useConversationStore } from '@/store/modules/conversation';
import { useMessageStore } from '@/store/modules/message';
import { useProviderStore } from '@/store/modules/provider';

defineOptions({ name: 'Conversation' });

const route = useRoute();

const messageStore = useMessageStore();
const conversationStore = useConversationStore();
const providerStore = useProviderStore();

let conversationId = ref(parseInt(route.params.id as string));
const initMessageId = parseInt(route.query.init as string);
const lastQuestion = computed(() => messageStore.getLastQuestion(conversationId.value));

const inputValue = ref('');
const filterMessages = computed(() => messageStore.items);
const sendedMessages = computed(() => filterMessages.value
  .filter((message) => message.status !== 'loading')
  .map((message) => {
    return {
      role: message.type === 'question' ? 'user' : 'assistant',
      content: message.content,
    };
  }),
);

const conversation = computed(() => {
  return conversationStore.getConversationById(conversationId.value);
});

// TODO: 兼容各状态
watch(() => route.params.id, async (newConversationId: string) => {
  conversationId.value = parseInt(newConversationId);
  await messageStore.fetchMessagesByConversation(conversationId.value);
});

const sendNewMessage = async (question: string) => {
  if (!question.trim()) {
    return;
  }
  const currDate = new Date().toISOString();
  const questionData: Omit<MessageProps, 'id'> = {
    content: question,
    conversationId: conversationId.value,
    type: 'question',
    createdAt: currDate,
    updatedAt: currDate,
  };
  await messageStore.createMessage(questionData);
  inputValue.value = '';

  creatingInitialMessage();
};

const creatingInitialMessage = async () => {
  const currDate = new Date().toISOString();
  const createdData: Omit<MessageProps, 'id'> = {
    content: '',
    conversationId: conversationId.value,
    type: 'answer',
    createdAt: currDate,
    updatedAt: currDate,
    status: 'loading',
  };

  const newMessageId = await messageStore.createMessage(createdData);

  if (conversation.value) {
    const provider = providerStore.getProviderById(conversation.value?.providerId);
    if (provider) {
      await window.electronAPI.startChat({
        messageId: newMessageId,
        providerName: provider.name,
        selectedModel: conversation.value?.selectedModel,
        messages: sendedMessages.value,
      });
    }
  }
};

onMounted(async () => {
  await messageStore.fetchMessagesByConversation(conversationId.value);

  if (initMessageId) {
    await creatingInitialMessage();
  }

  let streamContent = '';
  window.electronAPI.onUpdateMessage(async (streamData) => {
    console.log('stream', streamData);
    const { messageId, data } = streamData;
    streamContent += data.result;
    await messageStore.updateMessage(
      messageId,
      {
        status: data.is_end ? 'finished' : 'streaming' as MessageStatus,
        updatedAt: new Date().toISOString(),
        ...(!data.is_end && { content: streamContent }),
      },
    );
    if (data.is_end) {
      streamContent = '';
    }
  });
});
</script>

<style scoped>

</style>
