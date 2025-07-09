<template>
  <button
    :type="type"
    :class="[
      'block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer',
      colorName,
      { 'bg-gray-300': disabled },
      { 'cursor-pointer': !disabled },
    ]"
    :disabled="disabled"
    :selectionned="selectionned"
    v-bind="$attrs"
  >
    <img
      v-if="loading"
      src="@/assets/loaders/loader_linear.svg"
      alt="loader_linear"
      class="w-10 h-5 mx-auto"
    />
    <slot v-else></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    type: {
      type: String as () => "button" | "submit" | "reset",
      default: "button",
      validator: (value: string) =>
        ["button", "submit", "reset"].includes(value),
    },
    isTransparent: {
      type: Boolean,
      default: false,
    },
    isGreen: {
      type: Boolean,
      default: false,
    },
    isRed: {
      type: Boolean,
      default: false,
    },
    isBlue: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    selectionned: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    colorName() {
      if (this.isTransparent && !this.disabled)
        return "bg-transparent text-black hover:bg-gray-200";
      if (this.isGreen && !this.disabled)
        return "bg-primary-500 text-white hover:bg-primary-400 ";
        if (this.isRed && !this.disabled)
        return "bg-red-500 text-white hover:bg-red-400 ";
        if (this.isBlue && !this.disabled)
        return "bg-blue-500 text-white hover:bg-blue-400 ";
      return "";
    },
  },
});
</script>
