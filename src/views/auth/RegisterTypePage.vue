<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-white text-gray-800"
  >
    <h1 class="text-3xl font-semibold mb-2 text-center">
      Choisissez votre façon de rejoindre
      <span class="text-black font-bold">#ecodeli</span>
    </h1>
    <p class="text-gray-500 mb-8 text-center max-w-xl">
      Participez à une livraison plus responsable, valorisez vos trajets
      quotidiens et renforcez les liens au sein de votre communauté.
    </p>
    <div class="max-w-4xl w-full mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="userType in userTypes"
          :key="userType.type"
          @click="navigateToRegister(userType.route)"
          :class="[
            'bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300',
            'hover:shadow-xl hover:scale-105 hover:bg-gray-50',
            `border-l-4 border-${userType.color}-500`,
          ]"
        >
          <div class="text-center">
            <div class="text-4xl mb-4">{{ userType.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ userType.title }}
            </h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              {{ userType.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userTypes = ref([
  {
    type: "client",
    title: "Client",
    description: "Je veux envoyer des colis ou réserver des services",
    icon: "📦",
    route: "/inscription/client",
    color: "blue",
  },
  {
    type: "deliverer",
    title: "Livreur",
    description: "Je veux livrer des colis sur mes trajets",
    icon: "🚗",
    route: "/inscription/livreur",
    color: "green",
  },
  {
    type: "merchant",
    title: "Commerçant",
    description: "Je veux proposer des services de livraison",
    icon: "🏪",
    route: "/inscription/commercant",
    color: "purple",
  },
  {
    type: "provider",
    title: "Prestataire",
    description: "Je veux proposer des services à la personne",
    icon: "🔧",
    route: "/inscription/prestataire",
    color: "orange",
  },
]);

const navigateToRegister = (route: string) => {
  router.push(route);
};
</script>
