<template>
  <div class="message-list">
    <div
      v-for="message in messages"
      :key="message.id"
      class="message-item mb-3"
    >
      <div
        class="flex"
        :class="{ 'justify-end': message.type === 'question' }"
      >
        <div>
          <div
            class="text-sm text-gray-500 mb-2"
            :class="{'text-right': message.type === 'question'}"
          >
            {{ dayjs(message.createdAt).format('YYYY-MM-DD') }}
          </div>

          <div
            v-if="message.type === 'question'"
            class="message-question bg-green-700 text-white p-2 rounded-md"
          >
            <img
              v-if="message.imagePath"
              :src="`safe-file://${message.imagePath}`"
              alt="Message image"
              class="h-24 w-24 object-cover rounded block"
            />
            {{ message.content }}
          </div>

          <div 
            v-else 
            class="message-answer p-2 rounded-md"
            :class="{'bg-red-100 text-red-700': message.status === 'error', 'bg-gray-200 text-gray-700': message.status !== 'error'}"
          >
            <template v-if="message.status === 'loading'">
              <IIcon icon="eos-icons:three-dots-loading" />
            </template>
            <template v-else-if="message.status === 'error'">
              <span>{{ message.content }}</span>
            </template>
            <div
              v-else
              class="prose prose-slate prose-headings:my-2 prose-li:my-0 prose-ul:my-1 prose-p:my-1 prose-pre:p-0"
            >
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageProps } from '@/types/index';
import IIcon from '@/components/IIcon/index.vue';
import dayjs from 'dayjs';

defineOptions({ name: 'MessageList' });

defineProps<{ messages: MessageProps[] }>();
</script>

<style scoped>

</style>
