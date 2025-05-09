<template>
  <div class="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
    <h2 class="text-3xl font-semibold text-center text-indigo-600 mb-6">Client Registration</h2>
    <form class="space-y-5" @submit.prevent="register">
      <InputField v-model="form.forName" label="ForName" />
      <InputField v-model="form.lastName" label="LastName" />
      <InputField v-model="form.email" label="Email" type="email" />
      <InputField v-model="form.password" label="Password" type="password" />
      <InputField v-model="form.phone" label="Phone Number" />
      <ServiceSelector v-model="form.preferences" />
      <Checkbox v-model="form.tutorialConsent" label="Show tutorial on first login" />
      <button type="submit" class="btn-primary w-full">Register</button>
    </form>
    <button @click="goBack" class="btn-primary w-full mt-4">Go Back</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/ui/InputField.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import ServiceSelector from "@/components/ui/ServiceProposal.vue";

const router = useRouter()

const form = reactive({
  forName: '',
  lastName:'',
  email: '',
  password: '',
  phone: '',
  preferences: [],
  tutorialConsent: true,
})

const register = () => {
  console.log('Client registration:', JSON.stringify(form))
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
</style>
