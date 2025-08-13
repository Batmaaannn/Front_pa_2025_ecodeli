<template>
  <div class="relative isolate overflow-hidden min-h-screen flex flex-col">
    <svg
      class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
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
      class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      aria-hidden="true"
    >
      <div
        class="aspect-1108/632 w-277 bg-linear-to-r from-[#2a523b] to-[#8b408a] opacity-30"
        style="
          clip-path: polygon(
            73.6% 51.7%,
            91.7% 11.8%,
            100% 46.4%,
            97.4% 82.2%,
            92.5% 84.9%,
            75.7% 64%,
            55.3% 47.5%,
            46.5% 49.4%,
            45% 62.9%,
            50.3% 87.2%,
            21.3% 64.1%,
            0.1% 100%,
            5.4% 51.1%,
            21.4% 63.9%,
            58.9% 0.2%,
            73.6% 51.7%
          );
        "
      />
    </div>
    <div class="flex flex-1 min-h-0 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
        >
          Se connecter à votre compte
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="bg-gray-50 px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
          <form class="space-y-6" @submit.prevent="login()" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm/6 font-medium text-gray-900"
                >Adresse e-mail</label
              >
              <div class="mt-2">
                <input
                  v-model="email"
                  @blur="processEmail()"
                  type="email"
                  name="email"
                  id="email"
                  autocomplete="email"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm/6 font-medium text-gray-900"
                  >Mot de passe</label
                >
                <div class="text-sm">
                  <!-- TODO 
               <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Mot de passe oublié ?</a
              > -->
                </div>
              </div>
              <div class="mt-2">
                <input
                  v-model="password"
                  @blur="processPassword()"
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <p v-if="passwordError" class="mt-2 text-sm/6 text-red-600">
                  {{ passwordError }}
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center cursor-pointer rounded-md bg-primary-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                Connexion
              </button>
            </div>
          </form>
        </div>
        <Alert v-if="error" isError>{{ error }}</Alert>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
          Pas encore membre ?
          {{ " " }}
          <router-link
            :to="{ name: 'RegisterType' }"
            class="font-semibold text-primary-600 hover:text-primary-500"
            >S'incrire</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import Alert from "@/components/formControls/Alert.vue";

import * as Validators from "@/utils/validate";

const authStore = useAuthStore();
const userStore = useUserStore();

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const error = ref("");
const success = ref(false);
const loading = ref(false);

const formHasError = computed(() => {
  return (
    !email.value || !password.value || emailError.value || passwordError.value
  );
});

const router = useRouter();

async function login() {
  processEmail();
  processPassword();

  error.value = "";

  if (!formHasError.value) {
    try {
      loading.value = true;
      await authStore.login({
        email: email.value,
        password: password.value,
      });
      success.value = true;
      router.push({ path: userStore.getDashboardUrl });
    } catch (e: any) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  } else {
    error.value = "Le formulaire contient des erreurs";
  }
}

function processEmail() {
  emailError.value = Validators.mail(email.value) ?? "";
}

function processPassword() {
  if (!password.value) {
    passwordError.value = "Merci d'indiquer le mot de passe";
  } else {
    passwordError.value = "";
  }
}
</script>
