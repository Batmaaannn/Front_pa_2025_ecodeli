<script setup>
import LandingPage from "@/components/LandingPage.vue";
import Login from "@/components/Login.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main>
    <Header/>
    <RouterView />
    <Footer/>
  </main>
</template>

<style scoped>
</style>
