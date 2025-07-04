<template>
  <div
    class="mt-2 flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
    @drop.prevent="dragUpload"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
  >
    <div
      v-if="files.length > 0"
      class="flex flex-wrap justify-center p-2 max-h-1/2 overflow-y-auto text-center"
    >
      <div
        v-for="file in files"
        :key="file.name"
        class="border border-gray-400 rounded-full text-sm px-2 py-1 m-1 flex items-center"
      >
        {{ file.name }}
        <span
          @click="deleteFile(file.name)"
          class="ml-2 cursor-pointer text-red-500"
        >
          X
          <i class="fas fa-times"></i>
        </span>
      </div>
    </div>

    <div class="text-center">
      <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />
      <div
        class="mt-4 flex items-center justify-center text-sm/6 text-gray-600"
      >
        <label
          for="upload-input"
          class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
        >
          <span>Cliquez</span>
          <input
            type="file"
            @change="fileSelectionUpload"
            id="upload-input"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            class="hidden"
          />
        </label>
        <p class="pl-1">ou déposez votre fichier ici</p>
      </div>
      <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  files: {
    type: Array as () => File[],
    default: () => [],
  },
});

const emit = defineEmits<{
  (e: "upload", file: File): void;
  (e: "delete", name: string): void;
}>();

const fileSelectionUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files || !target.files.length) return;
  const file = target.files[0];
  target.value = "";
  emit("upload", file);
};

const dragUpload = (e: DragEvent) => {
  if (!e.dataTransfer || !e.dataTransfer.files.length) return;
  const file = e.dataTransfer.files[0];
  emit("upload", file);
};

const deleteFile = (name: string) => {
  emit("delete", name);
};
</script>
