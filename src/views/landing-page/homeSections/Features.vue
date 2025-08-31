<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
    <div class="mx-auto max-w-4xl lg:text-center">
      <h2 class="text-base/7 font-semibold text-primary-500">
        Une plateforme, plusieurs services
      </h2>
      <p
        class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
      >
        Tout ce dont vous avez besoin pour organiser, livrer ou demander un
        service
      </p>
      <p class="mt-6 text-lg/8 text-gray-500">
        Que vous soyez particulier, commerçant, livreur ou prestataire, EcoDeli
        centralise les services du quotidien : livraisons, trajets partagés,
        aide à domicile, achats à l’étranger et bien plus encore.
      </p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl
        class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="feature in primaryFeatures"
          :key="feature.name"
          class="flex flex-col"
        >
          <dt class="text-base/7 font-semibold text-gray-900">
            <div
              class="mb-6 flex size-10 items-center justify-center rounded-lg bg-primary-500"
            >
              <component
                :is="feature.icon"
                class="size-6 text-white"
                aria-hidden="true"
              />
            </div>
            {{ feature.name }}
          </dt>
          <dd class="mt-1 flex flex-auto flex-col text-base/7 text-gray-500">
            <p class="flex-auto">{{ feature.description }}</p>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TruckIcon,
  CameraIcon,
  StarIcon,
} from "@heroicons/vue/24/outline";
const primaryFeatures = [
  {
    name: "Livraisons à la demande",
    description:
      "Faites appel à des livreurs vérifiés pour des livraisons rapides et flexibles — courses, colis ou transferts vers l’aéroport.",
    icon: TruckIcon,
    href: "/drivers",
  },
  {
    name: "Services de proximité",
    description:
      "Accédez à un réseau de prestataires pour le ménage, le jardinage, l’aide aux personnes ou d'autres services du quotidien.",
    icon: CameraIcon,
    href: "/services",
  },
  {
    name: "Espace Commerçants",
    description:
      "Gérez vos livraisons, vos annonces et votre facturation depuis un portail dédié aux professionnels locaux.",
    icon: StarIcon,
    href: "/merchants",
  },
];
</script>
