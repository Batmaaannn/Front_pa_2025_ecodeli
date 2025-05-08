<template>
  <div class="space-y-4 p-4 border rounded-lg bg-white shadow-md">
    <div
        v-for="(value, key) in localItem"
        :key="key"
        class="flex flex-col"
    >
      <label :for="key" class="mb-1 font-semibold text-sm text-gray-700">
        {{ formatLabel(key) }}
      </label>

      <template v-if="isSelectField(key)">
        <select
            v-model="localItem[key]"
            :id="key"
            class="px-3 py-2 border rounded-md text-sm"
        >
          <option
              v-for="option in getOptionsForKey(key)"
              :key="option"
              :value="option"
          >
            {{ option }}
          </option>
        </select>
      </template>

      <template v-else>
        <input
            v-model="localItem[key]"
            :id="key"
            type="text"
            class="px-3 py-2 border rounded-md text-sm"
        />
      </template>
    </div>

    <div class="pt-2 flex justify-end space-x-2">
      <button
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
      >
        Annuler
      </button>
      <button
          @click="$emit('save', localItem)"
          class="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500 text-white rounded"
      >
        Enregistrer
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'

const props = defineProps({
  item: Object,
  selectOptions: {
    type: Object,
    default: () => ({
      role: ['Admin', 'Member', 'Guest'], // valeur d'exemple
    }),
  },
})

const emit = defineEmits(['save', 'cancel'])

// Clonage réactif de l'objet
const localItem = reactive({ ...props.item })

// Fonction de mise en forme des labels
const formatLabel = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ')

// Si une propriété a une liste d’options, on affiche un select
const isSelectField = (key) => !!props.selectOptions[key]

const getOptionsForKey = (key) => props.selectOptions[key] || []
</script>


<style scoped>

</style>