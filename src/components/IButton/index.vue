<template>
  <button
    class="i-button shadow-sm inline-flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none"
    :class="[colorClasses, sizeClasses]"
    :disabled="disabled || loading"
  >
    <IIcon
      v-if="iconName"
      :icon="iconName"
      class="mr-2"
    />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import IIcon from '@/components/IIcon/index.vue';

defineOptions({ name: 'IButton' });

export type ButtonColor = 'green' | 'purple';
export type ButtonSize = 'large' | 'small' | 'normal';
export interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  iconName?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorVariants: Record<ButtonColor, any> = {
  green: {
    plain: 'bg-green-50 hover:bg-green-700 text-green-700 hover:text-white border border-green-700',
    normal: 'bg-green-700 hover:bg-green-700/90 text-white border border-green-700',
  },
  purple: {
    plain: 'bg-purple-50 hover:bg-purple-700 text-purple-700 hover:text-white border border-purple-700',
    normal: 'bg-purple-700 hover:bg-purple-700/90 text-white border border-purple-700',
  },
};
const sizeVariants = {
  normal: 'h-[32px] py-[8px] px-[15px] text-sm rounded-[4px]',
  large: 'h-[40px] py-[12px] px-[19px] rounded-[4px] text-base',
  small: 'h-[24px] py-[11px] px-[5px] rounded-[3px] text-xs',
};

const props = withDefaults(defineProps<ButtonProps>(), {
  color: 'green',
  iconName: '',
  size: 'normal',
});

const colorClasses = computed(() => {
  return props.plain ? colorVariants[props.color].plain : colorVariants[props.color].normal;
});

const sizeClasses = computed(() => {
  return sizeVariants[props.size];
});

const iconName = computed(() => {
  return props.loading ? 'line-md:loading-loop' : props.iconName;
});
</script>

<style scoped></style>
