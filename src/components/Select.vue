<template>
  <div class="flex flex-col w-full">
    <select
      class="w-full my-1 px-4 py-2 text-black bg-white text-base rounded-md border border-gray-200 box-border"
      :class="{
        'border-red-500': error,
      }"
      v-bind="$attrs"
      @change="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      placeholder="Select an option"
    >
      <option
        v-for="option in options"
        :key="typeof option === 'string' ? option : option.value"
        :value="typeof option === 'string' ? option : option.value"
      >
        {{ typeof option === "string" ? option : option.label }}
      </option>
    </select>
    <div v-if="error" class="text-red-500 text-xs mt-1">
      <p>
        <small>{{ error }}</small>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  options: {
    type: Array as PropType<
      { label: string; value: string | number }[] | string[]
    >,
    required: true,
  },
  error: {
    type: String,
    default: "",
  },
});
</script>
