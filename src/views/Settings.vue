<template>
  <div class="settings-container w-[80%] my-0 mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">
      {{ t('settings.title') }}
    </h1>
    
    <TabsRoot
      v-model="activeTab"
      class="w-full"
    >
      <TabsList class="flex space-x-1 mb-6 border-b border-gray-200">
        <TabsTrigger 
          value="general"
          class="tabs-trigger"
        >
          {{ t('settings.general.title') }}
        </TabsTrigger>
        <TabsTrigger 
          value="models"
          class="tabs-trigger"
        >
          {{ t('settings.models.title') }}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <AccordionRoot
          type="multiple"
          class="space-y-4"
        >
          <AccordionItem
            value="common"
            open
            class="rounded-lg border border-gray-200"
          >
            <AccordionTrigger class="w-full px-4 py-2 text-left hover:bg-gray-50">
              <span class="text-lg font-semibold">{{ t('settings.general.common.title') }}</span>
            </AccordionTrigger>
            <AccordionContent class="px-4 py-2 space-y-4">
              <div class="flex items-center gap-4">
                <label class="w-24 text-gray-700">
                  {{ t('settings.general.common.theme') }}
                </label>
                <div class="flex items-center space-x-4">
                  <button
                    disabled
                    class="px-4 py-2 rounded-md transition-colors cursor-not-allowed" 
                    :class="theme === 'light' ? 'bg-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300'"
                  >
                    {{ t('settings.general.common.light') }}
                  </button>
                  <button
                    disabled
                    class="px-4 py-2 rounded-md transition-colors cursor-not-allowed" 
                    :class="theme === 'dark' ? 'bg-green-700 text-white' : 'bg-gray-200 hover:bg-gray-300'"
                  >
                    {{ t('settings.general.common.dark') }}
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <label class="w-24 text-gray-700">
                  {{ t('settings.general.common.language') }}
                </label>
                <SelectRoot
                  v-model="currentConfig.language"
                >
                  <SelectTrigger
                    class="w-48 px-3 py-2 rounded-md border border-gray-300 flex items-center justify-between"
                  >
                    <SelectValue />
                    <IIcon
                      icon="radix-icons:chevron-down"
                      class="h-5 w-5"
                    />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectContent class="bg-white rounded-md shadow-lg border">
                      <SelectViewport class="p-2">
                        <SelectGroup>
                          <SelectItem
                            value="zh"
                            class="relative px-6 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          >
                            <SelectItemText>简体中文</SelectItemText>
                            <SelectItemIndicator class="select-item-indicator">
                              <IIcon icon="radix-icons:check" />
                            </SelectItemIndicator>
                          </SelectItem>
                          <SelectItem
                            value="en"
                            class="relative px-6 py-2 rounded-md hover:bg-gray-100 cursor-pointer"
                          >
                            <SelectItemText>English</SelectItemText>
                            <SelectItemIndicator class="select-item-indicator">
                              <IIcon icon="radix-icons:check" />
                            </SelectItemIndicator>
                          </SelectItem>
                        </SelectGroup>
                      </SelectViewport>
                    </SelectContent>
                  </SelectPortal>
                </SelectRoot>
              </div>
              <div class="flex items-center gap-4">
                <label class="w-24 text-gray-700">
                  {{ t('settings.general.common.fontSize') }}
                </label>
                <NumberFieldRoot
                  v-model="currentConfig.fontSize"
                  :min="12"
                  :max="20"
                  class="inline-flex w-48"
                >
                  <NumberFieldDecrement class="px-2 border border-r-0 border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none">
                    <IIcon icon="radix-icons:minus" />
                  </NumberFieldDecrement>
                  <NumberFieldInput 
                    class="w-20 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 text-center"
                  />
                  <NumberFieldIncrement class="px-2 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-100 focus:outline-none">
                    <IIcon icon="radix-icons:plus" />
                  </NumberFieldIncrement>
                </NumberFieldRoot>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="notifications"
            open
            class="rounded-lg border border-gray-200"
          >
            <AccordionTrigger class="w-full px-4 py-2 text-left hover:bg-gray-50">
              <span class="text-lg font-semibold">{{ t('settings.general.notifications.title') }}</span>
            </AccordionTrigger>
            <AccordionContent class="px-4 py-2">
              <div class="space-y-4">
                <label class="flex items-center space-x-2 cursor-not-allowed">
                  <input 
                    v-model="notifications" 
                    type="checkbox"
                    disabled
                    class="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <span class="text-gray-700">{{ t('settings.general.notifications.enable') }}</span>
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>

      <TabsContent value="models">
        <AccordionRoot
          type="single"
          collapsible
          class="space-y-4"
        >
          <AccordionItem
            v-for="provider in providers"
            :key="provider.id"
            :value="provider.name"
            class="rounded-lg border border-gray-200"
          >
            <AccordionTrigger class="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50">
              <div class="flex items-center gap-2">
                <img
                  :src="provider.avatar"
                  :alt="provider.name"
                  class="w-6 h-6 rounded"
                />
                <span class="text-lg font-semibold">{{ provider.title }}</span>
              </div>
              <IIcon
                icon="radix-icons:chevron-down"
                class="transform transition-transform duration-200 ease-in-out data-[state=open]:rotate-180"
              />
            </AccordionTrigger>
            <AccordionContent class="px-4 py-2">
              <div class="space-y-4">
                <div
                  v-for="config in getProviderConfig(provider.name)"
                  :key="config.key"
                  class="flex items-center gap-4"
                >
                  <label class="text-gray-700 w-24">{{ config.label }}</label>
                  <input
                    :type="config.type"
                    :placeholder="config.placeholder"
                    :required="config.required"
                    :value="config.value"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    @input="(e) => updateProviderConfig(provider.name, config.key, (e.target as HTMLInputElement).value)"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </TabsContent>
    </TabsRoot>
  </div>
</template>

<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  NumberFieldRoot,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from 'radix-vue';
import IIcon from '@/components/IIcon/index.vue';
import { useProviderStore } from '@/store/modules/provider';
import { AppConfig } from '@/types/index';
import { useI18n } from 'vue-i18n';
import { setI18nLanguage } from '../i18n';
import { providerConfigs, ProviderConfigItem } from '../config/providerConfig';

// TODO: 支持新模型接入、模型版本选择
const { t } = useI18n();

const activeTab = ref('general');

const theme = ref<'light' | 'dark'>('light');
const notifications = ref<boolean>(false); 

const providerStore = useProviderStore();
const providers = computed(() => providerStore.items);

const getProviderConfig = (providerName: string): ProviderConfigItem[] => {
  const configs = providerConfigs[providerName] || [];
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {};
  }
  return configs.map(config => ({
    ...config,
    value: currentConfig.providerConfigs[providerName][config.key] || config.value,
  }));
};

const updateProviderConfig = (providerName: string, key: string, value: string) => {
  if (!currentConfig.providerConfigs[providerName]) {
    currentConfig.providerConfigs[providerName] = {};
  }
  currentConfig.providerConfigs[providerName][key] = value;
};

const currentConfig = reactive<AppConfig>({
  language: 'zh',
  fontSize: 14,
  providerConfigs: {},
});

watch(currentConfig, async (newConfig) => {
  const configToSave = {
    language: newConfig.language,
    fontSize: newConfig.fontSize,
    providerConfigs: JSON.parse(JSON.stringify(newConfig.providerConfigs)),
  };
  await window.electronAPI.updateConfig(configToSave);
}, {
  deep: true,
});

watch(() => currentConfig.fontSize, (newFontSize) => {
  document.documentElement.style.setProperty('--font-size', `${newFontSize}px`);
});

watch(() => currentConfig.language, async (newLanguage) => {
  setI18nLanguage(newLanguage);
});

onMounted(async () => {
  const config = await window.electronAPI.getConfig();
  Object.assign(currentConfig, config);
});
</script>

<style scoped>
.tabs-trigger {
  @apply px-4 py-2 -mb-[1px] font-medium text-gray-600 hover:text-gray-800 data-[state=active]:text-green-700 data-[state=active]:border-b-2 data-[state=active]:border-green-700;
}

.select-item-indicator {
  @apply absolute left-2 top-3 inline-flex items-center justify-center;
}
</style>
