<template>
  <div class="min-h-screen">
    <div class="t-main-set flex flex-col flex-grow min-h-screen">
      <slot />
    </div>
  </div>
  <div class="lg:pl-72">
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "./Footer.vue";
</script>
