<template>
  <div class="provider-select w-full">
    <SelectRoot v-model="currentModel">
      <SelectTrigger
        class="flex w-full items-center justify-between 
          rounded-md py-1.5 px-3 shadow-sm border outline-none data-[placeholder]:text-gray-400"
      >
        <SelectValue :placeholder="$t('provider.selectModel')">
          <template #default>
            <div
              v-if="currentModel"
              class="flex items-center"
            >
              <img
                :src="currentProvider?.avatar"
                :alt="currentProvider?.name"
                class="h-5 w-5 mr-2 rounded"
              />
              <span>{{ currentModel.split('/')[1] }}</span>
            </div>
          </template>
        </SelectValue>
        <IIcon
          icon="radix-icons:chevron-down"
          class="h-5 w-5"
        />
      </SelectTrigger>

      <SelectPortal>
        <SelectContent class="bg-white rounded-md shadow-md z-[99] border sticky">
          <SelectViewport class="p-2">
            <div
              v-for="provider in options"
              :key="provider.id"
            >
              <SelectLabel class="flex items-center px-6 h-7 text-gray-500">
                <img
                  :src="provider.avatar"
                  :alt="provider.name"
                  class="h-5 w-5 mr-2 rounded"
                />
                {{ provider.title }}
              </SelectLabel>
              <SelectGroup>
                <SelectItem 
                  v-for="(model, index) in provider.models"
                  :key="index"
                  :value="`${provider.id}/${model}`"
                  class="outline-none rounded flex items-center h-7 px-6 relative
                    text-green-700 cursor-pointer
                    data-[highlighted]:bg-green-700 data-[highlighted]:text-white
                  "
                >
                  <SelectItemIndicator class="absolute left-2 w-6">
                    <IIcon icon="radix-icons:check" />
                  </SelectItemIndicator>
                  <SelectItemText>{{ model }}</SelectItemText>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator class="h-[1px] my-2 bg-gray-300" />
            </div>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue';
import IIcon from '@/components/IIcon/index.vue';
import { ProviderProps } from '@/types/index';

defineOptions({ name: 'ProvideSelect' });

const currentModel = defineModel<string>();
const props = defineProps<{ options: ProviderProps[] }>();

const currentProvider = computed(() => {
  if (!currentModel.value) return null;
  const providerId = parseInt(currentModel.value.split('/')[0]);
  return props.options.find(provider => provider.id === providerId);
});
</script>

<style scoped></style>
