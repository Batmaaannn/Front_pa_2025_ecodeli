<template>
  <div class="space-y-4">
    <div class="flex justify-between mb-2">
      <div class="font-medium text-gray-700">Availability</div>
    </div>
    <div class="overflow-x-auto">
      <div class="grid grid-cols-10 gap-2 min-w-max">
        <div class="text-center font-semibold text-gray-700"></div>
        <div v-for="day in days" :key="day" class="text-center font-semibold text-gray-700">
          {{ day }}
        </div>

        <div class="text-center font-semibold text-gray-700"></div>
        <div v-for="(day, index) in days" :key="day" class="text-center">
          <div class="h-60 overflow-y-auto space-y-2">
            <button
                v-for="hour in hours"
                :key="hour"
                :class="{
                'bg-indigo-600 text-white': isAvailable(day, hour),
                'bg-gray-200': !isAvailable(day, hour)
              }"
                @click="toggleAvailability(day, hour)"
                class="py-1 px-2 rounded-md w-full text-center whitespace-nowrap"
            >
              {{ hour }}h
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['update:modelValue']);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 24 }, (_, i) => i);

// Initialiser selectedHours avec un tableau vide pour chaque jour si aucune valeur n'est définie
const selectedHours = ref(
    days.reduce((acc, day) => {
      acc[day] = props.modelValue[day] || []; // Initialise chaque jour avec un tableau vide s'il n'y a pas de valeur
      return acc;
    }, {})
);

const toggleAvailability = (day, hour) => {
  const index = selectedHours.value[day].indexOf(hour);
  if (index === -1) {
    selectedHours.value[day].push(hour);
  } else {
    selectedHours.value[day].splice(index, 1);
  }
  emit('update:modelValue', selectedHours.value);
};

const isAvailable = (day, hour) => {
  return selectedHours.value[day].includes(hour);
};
</script>

<style scoped>
.overflow-x-auto {
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  justify-content: flex-start;
}

.grid {
  display: grid;
  grid-template-columns: repeat(8, min-content);
  gap: 10px;
}

button {
  width: 100%;
}

button.bg-indigo-600 {
  background-color: #6366f1;
}

button.bg-gray-200 {
  background-color: #e5e7eb;
}

button:hover {
  cursor: pointer;
}

h3 {
  font-size: 1rem;
}
</style>
