<template>
  <label class="inline-flex items-center space-x-2">
    <input
        type="checkbox"
        class="accent-indigo-600"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="text-sm text-gray-700">{{ label }}</span>
  </label>
</template>

<script setup>
const props = defineProps({
  label: String,
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
</script>


<style scoped>

</style>