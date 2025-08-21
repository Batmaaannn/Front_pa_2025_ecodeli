<template>
  <header class="absolute inset-x-0 top-0 z-40">
    <nav
      class="flex items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <router-link :to="{ name: 'Home' }" class="-m-1.5 p-1.5">
          <span class="sr-only">Ecodeli</span>
          <img
            class="h-15 w-auto"
            src="../../../src/assets/logo/logo.svg"
            alt=""
          />
        </router-link>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="{ name: item.to }"
          class="text-sm/6 font-semibold text-gray-900"
          >{{ item.name }}</router-link
        >
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <router-link
          :to="{ name: 'Login' }"
          class="text-sm/6 font-semibold text-gray-900"
          >Se connecter <span aria-hidden="true">&rarr;</span></router-link
        >
      </div>
    </nav>
    <Dialog
      class="lg:hidden"
      @close="mobileMenuOpen = false"
      :open="mobileMenuOpen"
    >
      <div class="fixed inset-0 z-50" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Ecodeli</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=primary&shade=600"
              alt=""
            />
          </a>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="{ name: item.to }"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >{{ item.name }}</router-link
              >
            </div>
            <div class="py-6">
              <router-link
                :to="{ name: 'Login' }"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >Se connecter</router-link
              >
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { Dialog, DialogPanel } from "@headlessui/vue";
import { ref } from "vue";
const mobileMenuOpen = ref(false);

const navigation = [
  { name: "Nos prix", to: "Price" },
  { name: "Nous contacter", to: "Contact" },
];
</script>
