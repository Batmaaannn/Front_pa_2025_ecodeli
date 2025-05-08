<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <textarea
        class="input resize-none h-24"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>