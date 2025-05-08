<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <input
        :type="type"
        :value="modelValue"
        class="input"
        @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  type: { type: String, default: 'text' },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>