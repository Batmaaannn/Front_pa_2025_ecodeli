<template>
  <div class="bg-white">
    <Navigation />
    <main>
      <Hero />
      <Features />
      <Stats />
      <Cta />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Hero from "./landingPage/Hero.vue";
import Features from "./landingPage/Features.vue";
import Stats from "./landingPage/Stats.vue";
import Cta from "./landingPage/Cta.vue";
import Navigation from "../components/layouts/Navigation.vue";
import Footer from "../components/layouts/Footer.vue";
</script>
