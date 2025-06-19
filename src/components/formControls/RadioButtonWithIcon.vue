<template>
  <label
    class="cursor-pointer rounded-xl border px-4 py-3 text-center shadow-sm transition-all duration-200"
    :class="{
      'border-primary-600 bg-primary-50 text-primary-600 ring-2 ring-primary-500':
        modelValue === option.value,
      'border-gray-300 bg-white text-gray-900 hover:bg-gray-50':
        modelValue !== option.value,
    }"
  >
    <input
      type="radio"
      :value="option.value"
      :checked="modelValue === option.value"
      @change="$emit('update:modelValue', option.value)"
      class="sr-only"
    />
    <div class="flex flex-col items-center gap-1">
      <component :is="option.icon" class="h-6 w-6" />
      <span class="text-sm font-medium">{{ option.label }}</span>
    </div>
  </label>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface Option {
  value: string;
  label: string;
  icon: Component;
}

defineProps<{
  option: Option;
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>
