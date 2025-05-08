<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- Barre de recherche et pagination -->
    <SearchAndPerPage v-model="filters" />

    <!-- Édition -->
    <div v-if="editItem" class="mt-6">
      <h3 class="text-lg font-semibold mb-2">Modifier l'entrée</h3>
      <EditableItem
          :item="editItem"
          :selectOptions="{ role: ['Admin', 'Member', 'Guest'] }"
          @save="handleSave"
          @cancel="editItem = null"
      />
    </div>

    <!-- Tableau -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
        <tr>
          <th
              v-for="(header, index) in columns"
              :key="index"
              @click="toggleSort(header)"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer select-none"
          >
            {{ formatHeader(header) }}
            <span v-if="sortKey === header">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
          </th>
          <th
              v-if="$slots.rowActions"
              class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Actions
          </th>
        </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in paginatedList" :key="index">
          <td
              v-for="key in columns"
              :key="key"
              class="px-3 py-4 text-sm text-gray-700 whitespace-nowrap"
          >
            {{ item[key] }}
          </td>
          <td
              v-if="$slots.rowActions"
              class="px-3 py-4 text-sm text-gray-700 whitespace-nowrap"
          >
            <button
                @click="editItem = item"
                class="text-indigo-600 hover:text-indigo-900"
            >
              Edit
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Contrôles de pagination -->
    <PaginationControls
        :currentPage="currentPage"
        :totalPages="totalPageCount"
        @update:currentPage="currentPage = $event"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { searchInList } from '@/components/backoffice/utils/search'
import { paginate, totalPages } from '@/components/backoffice/utils/pagination'
import SearchAndPerPage from '@/components/backoffice/utils/SearchAndPerPage.vue'
import PaginationControls from '@/components/backoffice/utils/PaginationControls.vue'
import EditableItem from '@/components/backoffice/utils/EditableItem.vue'

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
})

const filters = ref({
  search: '',
  perPage: 10,
})

const currentPage = ref(1)
const sortKey = ref(null)
const sortOrder = ref('asc')
const editItem = ref(null)

watch([() => filters.value.search, () => filters.value.perPage], () => {
  currentPage.value = 1
})

const filteredAndSortedList = computed(() => {
  let result = searchInList(props.list, filters.value.search)

  if (sortKey.value) {
    result = [...result].sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      const modifier = sortOrder.value === 'asc' ? 1 : -1
      return aVal > bVal ? modifier : aVal < bVal ? -modifier : 0
    })
  }

  return result
})

const paginatedList = computed(() =>
    paginate(filteredAndSortedList.value, currentPage.value, filters.value.perPage)
)

const totalPageCount = computed(() =>
    totalPages(filteredAndSortedList.value, filters.value.perPage)
)

const columns = computed(() =>
    props.list.length ? Object.keys(props.list[0]) : []
)

const toggleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const formatHeader = (header) =>
    header.charAt(0).toUpperCase() + header.slice(1).replace(/_/g, ' ')

// Sauvegarde après édition
const handleSave = (updated) => {
  const index = props.list.findIndex((el) => el.email === updated.email)
  if (index !== -1) {
    props.list[index] = { ...updated }
  }
  editItem.value = null
}
</script>

<style scoped>
</style>
