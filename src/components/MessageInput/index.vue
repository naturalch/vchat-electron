<template>
  <div
    class="message-input w-full shadow-sm border rounded-lg py-1 px-2
    focus-within:border-green-700 border-gray-300"
  >
    <div
      v-if="imagePreview"
      class="mb-1 pb-1 relative flex items-center border-b border-gray-300"
    >
      <img
        :src="imagePreview"
        alt="Image Preview"
        class="w-12 h-12 object-contain rounded"
      />
    </div>
    <div
      class="flex items-center"
      :class="[
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ]"
    >
      <IIcon
        icon="radix-icons:image"
        class="!w-[24px] !h-[24px] mr-2"
        :class="[
          disabled ? 'text-gray-300' : 'text-gray-400 hover:text-gray-600',
        ]"
        @click="handleImageUpload"
      />
      <input
        v-model="currentInput"
        :placeholder="disabled ? t('home.noProviderSelected') : t('home.inputPlaceholder')"
        :disabled="disabled"
        type="text"
        class="outline-none border-0 flex-1 bg-white focus:ring-0"
        @keyup.enter="onSend"
      />
      <IButton
        :disabled="disabled"
        icon-name="radix-icons:paper-plane"
        @click="onSend"
      >
        {{ t('conversation.send') }}
      </IButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import IIcon from '@/components/IIcon/index.vue';
import IButton from '@/components/IButton/index.vue';
import { useI18n } from 'vue-i18n';

defineOptions({ name: 'MessageInput' });

const { t } = useI18n();

const props = defineProps<{
  disabled?: boolean;
}>();

const currentInput = defineModel<string>();

const imagePreview = ref<string | null>(null);

const emit = defineEmits<{
  send: [value: string, imagePath?: string]
}>();

let selectedImage: string | undefined = undefined;
const handleImageUpload = async (event: Event) => {
  if (props.disabled) {
    return;
  }
  const { filePaths, dataUrls, errorMsg } = await window.electronAPI.openFileDialog({ withDataUrl: true });
  if (!filePaths?.length || errorMsg) {
    return; 
  }
  selectedImage = filePaths[0];
  imagePreview.value = dataUrls?.[0] || null; 
};

const onSend = () => {
  if (props.disabled || !currentInput.value?.trim()) {
    return;
  }
  emit('send', currentInput.value, selectedImage);
  imagePreview.value = null;
  selectedImage = undefined;
};
</script>

<style scoped></style>
