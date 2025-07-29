<template>
  <div class="rounded-md p-4 my-2" :class="colorName">
    <div class="flex">
      <div class="flex-shrink-0">
        <component :is="iconName" class="h-6 w-6" />
      </div>
      <div class="ml-3">
        <p class="text-md"><slot></slot></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/20/solid";

const props = defineProps({
  isError: {
    type: Boolean,
    default: false,
  },
  isSuccess: {
    type: Boolean,
    default: false,
  },
  isWarning: { type: Boolean, default: false },
  isInfo: {
    type: Boolean,
    default: false,
  },
});

const iconName = computed(() => {
  if (props.isError) return XCircleIcon;
  if (props.isSuccess) return CheckCircleIcon;
  if (props.isWarning) return ExclamationTriangleIcon;
  if (props.isInfo) return InformationCircleIcon;
  return "";
});

const colorName = computed(() => {
  if (props.isError) return "bg-red-50 text-red-600 border-red-600";
  if (props.isSuccess)
    return "bg-primary-50 text-primary-500 border-prmary-500";
  if (props.isWarning) return "bg-yellow-50 text-yellow-500 border-yellow-500";
  if (props.isInfo) return "bg-blue-50 text-blue-500 border-blue-500";
  return "";
});
</script>
