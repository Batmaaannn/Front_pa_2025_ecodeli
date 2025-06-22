<template>
  {{ authStore.register }}
  <DropUploadFile
    subtitle="Cliquez ou déposez le fichier ici"
    @upload="setFile"
    @delete="removeFile"
    :files="files"
  />
</template>

<script setup lang="ts">
import DropUploadFile from "@/components/formControls/DropUploadFile.vue";
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth.store";

const authStore = useAuthStore();

const errorUploadPrescription = ref("");
const errorPrescriptionDetail = ref(true);
const files = ref<File[]>([]);
const prescriptionDetails = ref({});

function setFile(file: File) {
  errorUploadPrescription.value = "";

  if (file.size / 1024 / 1024 > 4) {
    errorUploadPrescription.value =
      "Le fichier est trop volumineux. Maximum 4Mo.";
    return;
  }

  files.value.push(file);
}

function removeFile(fileName: string) {
  files.value = files.value.filter((file) => file.name !== fileName);
}

const formHasError = computed(() => {
  return (
    !prescriptionDetails.value ||
    !files.value.length ||
    !!errorUploadPrescription.value ||
    errorPrescriptionDetail.value
  );
});
</script>
