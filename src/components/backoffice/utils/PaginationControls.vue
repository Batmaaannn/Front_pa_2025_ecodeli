<template>
  <div class="mt-4 flex justify-between items-center text-sm text-gray-700">
    <p>Page {{ currentPage }} sur {{ totalPages }}</p>
    <div class="space-x-2">
      <button
          @click="$emit('update:currentPage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Précédent
      </button>
      <button
          @click="$emit('update:currentPage', currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
})
defineEmits(['update:currentPage'])
</script>

<style scoped>

</style>