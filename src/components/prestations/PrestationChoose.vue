<template>
  <fieldset aria-label="Server size">
    <div class="grid lg:grid-cols-2 gap-4 sm:grid-cols-1">
      <label
        v-for="plan in prestations"
        :key="plan.id"
        :aria-label="plan.label"
        :aria-description="`${plan.label}, ${plan.category}`"
        class="group relative block rounded-lg border border-gray-300 bg-white px-6 py-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-primary-600 has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 sm:flex sm:justify-between"
      >
        <input
          type="checkbox"
          :value="plan.id"
          :checked="modelValue.includes(plan.id)"
          @change="onChange(plan.id, $event.target.checked)"
          class="absolute top-0 left-0 w-full h-full z-0 appearance-none focus:outline-none"
        />

        <span class="flex items-center">
          <span class="flex flex-col text-sm">
            <span class="font-medium text-gray-900">{{ plan.label }}</span>
            <span class="text-gray-500">
              {{ plan.category }}
            </span>
          </span>
        </span>
        <span
          class="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right"
        >
          <input
            type="number"
            :name="`quantity-${plan.id}`"
            :max="999"
            min="0"
            :disabled="!modelValue.includes(plan.id)"
            class="w-20 z-10 relative rounded border border-gray-300 px-2 py-1 text-right text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
            v-model.number="price[plan.id]"
            @input="onPriceInput(plan.id)"
          />
          <span class="ml-1 text-gray-500 sm:ml-0">/heure</span>
        </span>
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import type { Prestation } from "@/types/prestation";
import { ref } from "vue";

const props = defineProps<{
  prestations: Prestation[];
  modelValue: number[];
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number[]): void;
  (e: "update:prestationPrice", value: { id: number; value: number }): void;
}>();

const price = ref<Record<number, number>>({});

const onChange = (id: number, checked: boolean) => {
  const newValue = checked
    ? [...props.modelValue, id]
    : props.modelValue.filter((v) => v !== id);
  emit("update:modelValue", newValue);
};

const onPriceInput = (id: number) => {
  let val = price.value[id] || 0;
  if (val.toString().length > 3) {
    val = Number(val.toString().slice(0, 3));
    price.value[id] = val;
  }
  emit("update:prestationPrice", { id, value: val });
};
</script>
