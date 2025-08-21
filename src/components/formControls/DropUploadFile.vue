<template>
  <div
    class="relative mt-4 flex flex-col justify-center rounded-xl border-2 border-dashed transition-all duration-300 px-8 py-12"
    :class="
      isDragging
        ? 'border-primary-500 bg-primary-50'
        : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-white'
    "
    @drop.prevent="handleDrop"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @dragover.prevent
  >
    <div v-if="files.length > 0" class="mb-6 space-y-2">
      <h4 class="text-sm font-medium text-gray-700 mb-3">
        {{ multiple ? 'Fichiers sélectionnés :' : 'Fichier sélectionné :' }}
      </h4>
      <TransitionGroup name="file-list" tag="div" class="space-y-2">
        <div
          v-for="file in files"
          :key="file.name"
          class="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <DocumentIcon
                v-if="getFileIcon(file.name) === 'document'"
                class="h-8 w-8 text-gray-400"
              />
              <PhotoIcon v-else class="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
              <p class="text-xs text-gray-500">
                {{ formatFileSize(file.size) }}
              </p>
            </div>
          </div>
          <button
            @click="deleteFile(file.name)"
            class="ml-4 p-1.5 rounded-full hover:bg-red-50 transition-colors group"
            type="button"
          >
            <XMarkIcon
              class="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors"
            />
          </button>
        </div>
      </TransitionGroup>
    </div>

    <div v-if="!isSingleFileUploaded" class="text-center">
      <div
        class="mx-auto rounded-full bg-primary-100 p-4 w-20 h-20 flex items-center justify-center mb-4"
      >
        <CloudArrowUpIcon class="h-10 w-10 text-primary-600" />
      </div>
      <div class="space-y-2">
        <label
          for="upload-input"
          class="relative cursor-pointer inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
        >
          <ArrowUpTrayIcon class="h-5 w-5" />
          <span>{{ multiple ? 'Choisir des fichiers' : 'Choisir un fichier' }}</span>
          <input
            type="file"
            @change="fileSelectionUpload"
            id="upload-input"
            :multiple="multiple"
            accept=".pdf,.jpg,.jpeg,.png"
            class="hidden"
          />
        </label>
        <p class="text-sm text-gray-600">{{ multiple ? 'ou glissez-déposez vos fichiers ici' : 'ou glissez-déposez votre fichier ici' }}</p>
      </div>
      <div class="mt-4 space-y-1">
        <p class="text-xs text-gray-500">Formats acceptés : PDF, JPG, PNG</p>
        <p class="text-xs text-gray-500">Taille maximale : 10 MB par fichier</p>
      </div>
    </div>

    <Transition name="drag-overlay">
      <div
        v-if="isDragging"
        class="absolute inset-0 rounded-xl bg-primary-500 bg-opacity-10 flex items-center justify-center pointer-events-none"
      >
        <div class="text-center">
          <CloudArrowUpIcon
            class="mx-auto h-16 w-16 text-primary-600 animate-bounce"
          />
          <p class="mt-2 text-lg font-semibold text-primary-600">
            {{ multiple ? 'Déposez vos fichiers ici' : 'Déposez votre fichier ici' }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  PhotoIcon,
  CloudArrowUpIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
  DocumentIcon,
} from "@heroicons/vue/24/solid";

const props = defineProps({
  files: {
    type: Array as () => File[],
    default: () => [],
  },
  multiple: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  (e: "upload", file: File): void;
  (e: "delete", name: string): void;
}>();

const isDragging = ref(false);
let dragCounter = 0;

const isSingleFileUploaded = computed(() => {
  return !props.multiple && props.files.length > 0;
});

const fileSelectionUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files || !target.files.length) return;
  
  if (!props.multiple) {
    // For single file mode, only emit the first file
    emit("upload", target.files[0]);
  } else {
    // For multiple files mode, emit all files
    Array.from(target.files).forEach((file) => {
      emit("upload", file);
    });
  }
  target.value = "";
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  dragCounter = 0;
  if (!e.dataTransfer || !e.dataTransfer.files.length) return;
  
  if (!props.multiple) {
    // For single file mode, only emit the first file
    emit("upload", e.dataTransfer.files[0]);
  } else {
    // For multiple files mode, emit all files
    Array.from(e.dataTransfer.files).forEach((file) => {
      emit("upload", file);
    });
  }
};

const handleDragEnter = () => {
  dragCounter++;
  isDragging.value = true;
};

const handleDragLeave = () => {
  dragCounter--;
  if (dragCounter === 0) {
    isDragging.value = false;
  }
};

const deleteFile = (name: string) => {
  emit("delete", name);
};

const getFileIcon = (fileName: string): string => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "document";
  if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) return "image";
  return "document";
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
</script>

<style scoped>
.file-list-enter-active,
.file-list-leave-active {
  transition: all 0.3s ease;
}

.file-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.file-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.file-list-move {
  transition: transform 0.3s ease;
}

.drag-overlay-enter-active,
.drag-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.drag-overlay-enter-from,
.drag-overlay-leave-to {
  opacity: 0;
}
</style>
