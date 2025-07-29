<template>
  <div class="min-h-screen">
    <Navigation />
    <div class="t-main-set flex flex-col flex-grow min-h-screen">
      <slot />
    </div>
  </div>
  <Footer />
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
import Navigation from "./Navigation.vue";
</script>
