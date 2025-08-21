<template>
  <div class="relative isolate overflow-hidden min-h-screen flex flex-col">
    <svg
      class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_left,white,transparent)] stroke-gray-200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
      />
    </svg>
    <div
      class="flex flex-1 flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 my-4"
    >
      <div class="my-8">
        <Stepper
          :steps="authStore.stepperSteps"
          :current-step-index="authStore.currentStepIndex"
          @step-click="handleStepClick"
        />
      </div>

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAuthStore } from "@/stores/auth.store";
import Stepper from "@/components/Stepper.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const handleStepClick = (step: any, index: number) => {
  if (index < authStore.currentStepIndex) {
    authStore.currentStepIndex = index;
    authStore.updateStepStatuses();
    if (step.pathName) {
      router.push(step.pathName);
    }
  }
};

onMounted(() => {
  authStore.initializeStepper([
    {
      name: "InformationsMerchant",
      pathName: "/inscription/commercant",
    },
    {
      name: "CompanyInformationsMerchant",
      pathName: "/inscription/commercant/entreprise",
    },
    {
      name: "CompanyDocumentsMerchant",
      pathName: "/inscription/commercant/documents",
    },
  ]);

  // Set the current step based on current route
  authStore.updateCurrentStepByRoute(route.path);
});

// Update current step when route changes
watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath) {
      authStore.updateCurrentStepByRoute(newPath);
    }
  }
);
</script>
