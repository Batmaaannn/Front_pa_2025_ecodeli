<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">{{
      label
    }}</label>
    <textarea
      class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg transition-all duration-200 text-[0.95rem] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:shadow-[0_0_0_3px_rgba(34,197,94,0.1)] hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 resize-vertical min-h-[80px]"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>
