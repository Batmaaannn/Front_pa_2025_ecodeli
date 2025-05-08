<template>
  <div class="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-lg">
    <h2 class="text-3xl font-semibold text-center text-indigo-600 mb-6">Service Provider Registration</h2>
    <form class="space-y-5" @submit.prevent="register">
      <InputField v-model="form.name" label="Full Name" />
      <InputField v-model="form.email" label="Email" type="email" />
      <InputField v-model="form.password" label="Password" type="password" />
      <InputField v-model="form.phone" label="Phone Number" />
      <TextareaField v-model="form.services" label="Describe your services" />
      <InputField v-model="form.rate" label="Hourly Rate (€)" />
      <AvailabilityCalendar v-model="form.availability" />
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Certifications</label>
        <input type="file" multiple class="file-input" />
      </div>
      <Checkbox label="I agree to profile validation by EcoDeli" />
      <button type="submit" class="btn-primary w-full">Register</button>
    </form>
    <button @click="goBack" class="btn-primary w-full mt-4">Go Back</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/ui/InputField.vue'
import TextareaField from '@/components/ui/TextareaField.vue'
import Checkbox from '@/components/ui/Checkbox.vue'
import AvailabilityCalendar from '@/components/ui/AvailabilityCalendar.vue'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  services: '',
  rate: '',
  availability: {},
})

const register = () => {
  console.log('Provider registration:', JSON.stringify(form));
  console.log('Availability:', JSON.stringify(form.availability));
};

const goBack = () => {
  router.go(-1)
}
</script>

<style scoped>
</style>
