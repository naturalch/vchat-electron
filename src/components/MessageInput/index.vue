<template>
  <div
    class="message-input w-full shadow-sm border rounded-lg py-1 px-2
    focus-within:border-green-700 border-gray-300"
  >
    <div class="flex items-center">
      <IIcon
        icon="radix-icons:image"
        class="!w-[24px] !h-[24px] mr-2"
        :class="[
          disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 cursor-pointer hover:text-gray-600',
        ]"
      />
      <input
        v-model="currentInput"
        :placeholder="disabled ? '请先选择模型' : '请输入内容'"
        :disabled="disabled"
        type="text"
        class="outline-none border-0 flex-1 bg-white focus:ring-0"
      />
      <IButton
        :disabled="disabled"
        icon-name="radix-icons:paper-plane"
        @click="onSend"
      >
        发送
      </IButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import IIcon from '@/components/IIcon/index.vue';
import IButton from '@/components/IButton/index.vue';

defineOptions({ name: 'MessageInput' });

const props = defineProps<{
  disabled?: boolean;
}>();

const currentInput = defineModel<string>();

const emit = defineEmits<{
  send: [value: string, imagePath?: string]
}>();

const onSend = () => {
  if (props.disabled || !currentInput.value?.trim()) {
    return;
  }
  emit('send', currentInput.value);
};
</script>

<style scoped></style>
