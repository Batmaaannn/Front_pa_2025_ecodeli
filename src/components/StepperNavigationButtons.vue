<template>
  <div class="mt-8 flex justify-between">
    <Button
      v-if="showPrevious"
      @click="onPrevious"
      type="button"
      :disabled="disablePrevious"
      isGreen
    >
      {{ previousText }}
    </Button>
    <div v-else></div>
    
    <Button
      v-if="showNext"
      @click="onNext"
      :type="submitType"
      :disabled="disableNext"
      :loading="loading"
      isGreen
    >
      {{ nextText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/formControls/Button.vue';

interface Props {
  showPrevious?: boolean;
  showNext?: boolean;
  disablePrevious?: boolean;
  disableNext?: boolean;
  loading?: boolean;
  previousText?: string;
  nextText?: string;
  submitType?: 'button' | 'submit';
}

const props = withDefaults(defineProps<Props>(), {
  showPrevious: true,
  showNext: true,
  disablePrevious: false,
  disableNext: false,
  loading: false,
  previousText: 'Précédent',
  nextText: 'Suivant',
  submitType: 'button',
});

const emit = defineEmits<{
  previous: [];
  next: [];
}>();

const onPrevious = () => {
  emit('previous');
};
const onNext = () => {
  emit('next');
};
</script>