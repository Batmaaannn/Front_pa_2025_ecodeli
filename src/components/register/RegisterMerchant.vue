<template>
  <div class="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
    <h2 class="text-3xl font-semibold text-center text-indigo-600 mb-6">Merchant Registration</h2>
    <form class="space-y-5" @submit.prevent="register">
      <InputField v-model="form.companyName" label="Company Name" />
      <InputField v-model="form.contactName" label="Contact Name" />
      <InputField v-model="form.email" label="Email" type="email" />
      <InputField v-model="form.password" label="Password" type="password" />
      <InputField v-model="form.phone" label="Phone Number" />
      <InputField v-model="form.siret" label="SIRET Number" />
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Contract</label>
        <input type="file" class="file-input" />
      </div>
      <Checkbox label="I accept EcoDeli billing terms" />
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

const router = useRouter()

const form = reactive({
  companyName: '',
  contactName: '',
  email: '',
  password: '',
  phone: '',
  siret: '',
})

const register = () => {
  console.log('Merchant registration:', form)
}

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
</style>
