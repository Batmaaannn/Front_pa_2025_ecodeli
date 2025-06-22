<template>
  <div>
    <nav aria-label="Progress">
      <ol role="list" class="overflow-hidden">
        <li
          v-for="(step, stepIdx) in steps"
          :key="step.name"
          :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
        >
          <template v-if="getStepStatus(step.step) === 'complete'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-primary-500"
              aria-hidden="true"
            />
            <a class="group relative flex items-start">
              <span class="flex h-9 items-center">
                <span
                  class="relative z-10 flex size-8 items-center justify-center rounded-full bg-primary-500 group-hover:bg-primary-600"
                >
                  <CheckIcon
                    class="h-5 w-5 flex-none text-white"
                    aria-hidden="true"
                  />
                </span>
              </span>
              <span class="ml-4 flex min-w-0 flex-col">
                <span class="text-sm font-medium">{{ step.name }}</span>
                <span class="text-sm text-gray-500">{{
                  step.description
                }}</span>
              </span>
            </a>
          </template>

          <template v-else-if="getStepStatus(step.step) === 'current'">
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
              aria-hidden="true"
            />
            <a class="group relative flex items-start" aria-current="step">
              <span class="flex h-9 items-center" aria-hidden="true">
                <span
                  class="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                >
                  <span class="size-2.5 rounded-full bg-primary-500" />
                </span>
              </span>
              <span class="ml-4 flex min-w-0 flex-col">
                <span class="text-sm font-medium text-primary">{{
                  step.name
                }}</span>
                <span class="text-sm text-gray-500">{{
                  step.description
                }}</span>
              </span>
            </a>
          </template>

          <template v-else>
            <div
              v-if="stepIdx !== steps.length - 1"
              class="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
              aria-hidden="true"
            />
            <a class="group relative flex items-start">
              <span class="flex h-9 items-center" aria-hidden="true">
                <span
                  class="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400"
                >
                  <span
                    class="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                  />
                </span>
              </span>
              <span class="ml-4 flex min-w-0 flex-col">
                <span class="text-sm font-medium text-gray-500">{{
                  step.name
                }}</span>
                <span class="text-sm text-gray-500">{{
                  step.description
                }}</span>
              </span>
            </a>
          </template>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/20/solid";
import { useAuthStore } from "@/stores/auth.store";
import { RegisterSteps } from "@/types/auth";
const authStore = useAuthStore();

function getStepStatus(
  step: RegisterSteps
): "complete" | "current" | "not-completed" {
  if (authStore.isCompleted(step)) return "complete";
  if (authStore.currentRegisterStep === step) return "current";
  return "not-completed";
}

const steps = [
  {
    name: "Profil utilisateur",
    step: RegisterSteps.PROFIL,
    description: "Renseignement du profil utilisateur",
  },
  {
    name: "Prestations",
    step: RegisterSteps.PRESTATIONS,
    description: "Choix des prestations",
  },
  {
    name: "Informations personnelles",
    step: RegisterSteps.INFORMATIONS,
    description: "Renseignement des informations personnelles",
  },
  {
    name: "Documents",
    step: RegisterSteps.DOCUMENTS,
    description: "Renseignement des documents justificatifs",
  },
];
</script>
