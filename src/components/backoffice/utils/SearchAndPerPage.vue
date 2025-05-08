<template>
  <div class="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <input
        v-model="modelValue.search"
        type="text"
        placeholder="Rechercher..."
        class="w-full sm:w-1/2 px-4 py-2 mb-2 sm:mb-0 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
    />

    <div class="flex items-center space-x-2">
      <label for="perPage" class="text-sm text-gray-700">Lignes par page:</label>
      <select
          v-model.number="modelValue.perPage"
          id="perPage"
          class="px-2 py-1 border rounded-md text-sm"
      >
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>


<style scoped>

</style>