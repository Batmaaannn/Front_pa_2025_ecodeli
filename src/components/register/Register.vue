<script setup>

</script>

<template>
  <div class="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4 text-center">Choose your profile</h2>
    <div class="grid gap-4">
      <RouterLink to="/register/deliverer" class="btn">Deliverer</RouterLink>
      <RouterLink to="/register/client" class="btn">Client</RouterLink>
      <RouterLink to="/register/merchant" class="btn">Merchant</RouterLink>
      <RouterLink to="/register/provider" class="btn">Service Provider</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.btn {
  display: block;
  text-align: center;
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: bold;
  transition: background 0.2s;
}
.btn:hover {
  background-color: #4338ca;
}
</style>
