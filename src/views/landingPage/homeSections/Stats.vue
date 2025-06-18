<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
      <h2 class="text-base/8 font-semibold text-primary-500">Notre impact</h2>
      <p
        class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"
      >
        Déjà adopté par des centaines d’utilisateurs à travers la France
      </p>
      <p class="mt-6 text-lg/8 text-gray-500">
        Des particuliers, commerçants et prestataires nous font confiance chaque
        jour pour faciliter les livraisons, organiser leurs déplacements ou
        proposer leurs services en toute simplicité.
      </p>
    </div>
    <dl
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-gray-900 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4"
    >
      <div
        v-for="stat in stats"
        :key="stat.id"
        class="flex flex-col gap-y-3 border-l border-white/10 pl-6"
      >
        <dt class="text-sm/6">{{ stat.name }}</dt>
        <dd
          class="order-first text-3xl font-semibold tracking-tight text-primary-700"
        >
          {{ stat.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>
<script setup lang="ts">
const stats = [
  { id: 1, name: "Livreurs sur la platforme", value: "3,000+" },
  { id: 2, name: "Annonces déposées", value: "10,000+" },
  { id: 3, name: "Clients contents", value: "88.9%" },
  { id: 4, name: "Communes desservies", value: "1200+" },
];
</script>
