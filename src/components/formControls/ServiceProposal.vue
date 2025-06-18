<template>
  <div>
    <h3 class="text-lg font-medium text-gray-700 mb-2">Select Preferred Services</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <label
          v-for="service in services"
          :key="service.id"
          class="flex items-center space-x-2 bg-gray-100 p-3 rounded-md hover:bg-indigo-50 transition"
      >
        <input
            type="checkbox"
            :value="service.id"
            :checked="internalValue.includes(service.id)"
            @change="toggleSelection(service.id)"
            class="form-checkbox text-indigo-600"
        />
        <span>{{ service.name }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed(() => props.modelValue)

function toggleSelection(id) {
  const newValue = [...internalValue.value]
  const index = newValue.indexOf(id)
  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(id)
  }
  emit('update:modelValue', newValue)
}

const services = [
  { id: 1, name: 'Transport de personnes âgées' },
  { id: 2, name: 'Transport pour consultations' },
  { id: 3, name: 'Courses par livreurs' },
  { id: 4, name: 'Garde d’animaux' },
  { id: 5, name: 'Jardinage' },
  { id: 6, name: 'Transport de colis' },
]
</script>

<style scoped>
</style>
