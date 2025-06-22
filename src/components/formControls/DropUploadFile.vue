<template>
  <div
    class="flex flex-col justify-around items-center m-4 border border-red-500 rounded-lg w-64 h-64"
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

    <label
      for="upload-input"
      class="flex flex-col items-center justify-center w-full h-1/2 p-2 cursor-pointer"
    >
      <input
        type="file"
        @change="fileSelectionUpload"
        id="upload-input"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        class="hidden"
      />
      <span
        class="flex justify-center items-center w-5 h-5 p-2 border border-orange-400 rounded-full text-orange-400"
      >
      +
        <i class="fas fa-plus"></i>
      </span>
      <p class="text-center mt-2 px-2">{{ subtitle }}</p>
    </label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  subtitle: {
    type: String,
    default: "Cliquez ou déposez votre fichier ici ",
  },
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
