<template>
  <nav class="flex items-center justify-center" aria-label="Progress">
    <p class="text-sm font-medium">
      Step {{ computedCurrentStepIndex + 1 }} of
      {{ steps.length }}
    </p>
    <ol role="list" class="ml-8 flex items-center space-x-5">
      <li v-for="(step, index) in steps" :key="step.name">
        <button
          v-if="step.status === 'complete'"
          @click="handleStepClick(step, index)"
          type="button"
          class="block size-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900 cursor-pointer"
        >
          <span class="sr-only">{{ step.name }}</span>
        </button>
        <span
          v-else-if="step.status === 'current'"
          class="relative flex items-center justify-center"
          aria-current="step"
        >
          <span class="absolute flex size-5 p-px" aria-hidden="true">
            <span class="size-full rounded-full bg-indigo-200" />
          </span>
          <span
            class="relative block size-2.5 rounded-full bg-indigo-600"
            aria-hidden="true"
          />
          <span class="sr-only">{{ step.name }}</span>
        </span>
        <span v-else class="block size-2.5 rounded-full bg-gray-200">
          <span class="sr-only">{{ step.name }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue";

interface Step {
  name: string;
  status: "complete" | "current" | "upcoming";
  pathName: string;
}

const props = defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  currentStepIndex: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits<{
  "step-click": [step: Step, index: number];
}>();

const computedCurrentStepIndex = computed(() => {
  if (props.currentStepIndex !== null) {
    return props.currentStepIndex;
  }
  return props.steps.findIndex((step) => step.status === "current");
});

const handleStepClick = (step: Step, index: number) => {
  if (step.status === "complete") {
    emit("step-click", step, index);
  }
};
</script>
