<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-semibold leading-6 text-gray-900"
      >{{ label }}</label
    >
    <div class="mt-2 grid grid-cols-1">
      <input
        :id="name"
        :name="name"
        :autocomplete="autoCompleteName"
        :class="[
          'col-start-1 row-start-1 block w-full rounded-md border-0 px-3.5 py-2 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6',
          {
            'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600 outline-red-300 outline outline-1 -outline-offset-1 ':
              error,
          },
        ]"
        type="text"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />

      <ExclamationCircleIcon
        v-if="error"
        class="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
        aria-hidden="true"
      />
    </div>
    <div v-if="error">
      <p class="text-red-600">
        <small>{{ error }}</small>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";

defineProps({
  modelValue: {
    type: [String, Number, Date],
  },
  error: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  autoCompleteName: {
    type: String,
    default: "",
  },
});
</script>
