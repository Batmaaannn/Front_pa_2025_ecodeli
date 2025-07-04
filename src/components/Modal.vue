<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-90"
  >
    <div class="relative bg-white dark:bg-gray-700 rounded-lg p-8" @click.stop>
      <div
        class="absolute top-5 right-5 cursor-pointer"
        @click="$emit('close')"
      >
        <XMarkIcon class="size-6" aria-hidden="true" />
      </div>
      <div class="content max-h-[90vh] overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/outline";
</script>
