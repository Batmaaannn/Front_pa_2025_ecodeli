<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6">
          <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Modifier mon profil
          </h1>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Gérez vos informations personnelles et professionnelles
          </p>
        </div>
        
        <form @submit.prevent="updateProfile" class="px-4 py-5 sm:p-6">
          <!-- Basic User Information -->
          <div class="space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    type="email"
                    v-model="formData.email"
                    disabled
                    class="block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                  />
                </div>
                <p class="mt-1 text-xs text-gray-500">
                  L'email ne peut pas être modifié
                </p>
              </div>
            </div>

            <!-- Customer specific fields -->
            <div v-if="isCustomer" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Informations personnelles</h3>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    v-model="formData.first_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    v-model="formData.last_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    v-model="formData.phone_number"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700">
                    Ville
                  </label>
                  <input
                    id="city"
                    type="text"
                    v-model="formData.city"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="address1" class="block text-sm font-medium text-gray-700">
                    Adresse
                  </label>
                  <input
                    id="address1"
                    type="text"
                    v-model="formData.address_1"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="postalCode" class="block text-sm font-medium text-gray-700">
                    Code postal
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    v-model="formData.postal_code"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Professional fields (Merchant, ServiceAgent, DeliveryAgent) -->
            <div v-if="isProfessional" class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Informations professionnelles</h3>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    v-model="formData.first_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    v-model="formData.last_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    v-model="formData.phone_number"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="siret" class="block text-sm font-medium text-gray-700">
                    SIRET
                  </label>
                  <input
                    id="siret"
                    type="text"
                    v-model="formData.siret"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700">
                    Nom de l'entreprise
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    v-model="formData.company_name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="companyAddress" class="block text-sm font-medium text-gray-700">
                    Adresse de l'entreprise
                  </label>
                  <input
                    id="companyAddress"
                    type="text"
                    v-model="formData.company_address"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label for="companyCity" class="block text-sm font-medium text-gray-700">
                    Ville de l'entreprise
                  </label>
                  <input
                    id="companyCity"
                    type="text"
                    v-model="formData.company_city"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
              </div>

              <!-- ServiceAgent specific fields -->
              <div v-if="isServiceAgent" class="mt-6">
                <div>
                  <label for="certifications" class="block text-sm font-medium text-gray-700">
                    Certifications
                  </label>
                  <textarea
                    id="certifications"
                    v-model="formData.certifications"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    placeholder="Décrivez vos certifications..."
                  ></textarea>
                </div>
              </div>

              <!-- DeliveryAgent specific fields -->
              <div v-if="isDeliveryAgent" class="mt-6">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label for="vehicleType" class="block text-sm font-medium text-gray-700">
                      Type de véhicule
                    </label>
                    <select
                      id="vehicleType"
                      v-model="formData.vehicle_type"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="CAR">Voiture</option>
                      <option value="BIKE">Vélo</option>
                      <option value="SCOOTER">Scooter</option>
                      <option value="MOTORCYCLE">Moto</option>
                    </select>
                  </div>
                  <div>
                    <label for="licenseNumber" class="block text-sm font-medium text-gray-700">
                      Numéro de permis
                    </label>
                    <input
                      id="licenseNumber"
                      type="text"
                      v-model="formData.license_number"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="resetForm"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mt-4">
        <div class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="mt-4">
        <div class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">
                {{ errorMessage }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'
import { axios, getAxiosError } from '@/libs/axios'
import {
  isCustomerUser,
  isMerchantUser,
  isServiceAgentUser,
  isDeliveryAgentUser
} from '@/types/typeGuards'

const userStore = useUserStore()

const formData = ref({
  email: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  address_1: '',
  address_2: '',
  postal_code: '',
  city: '',
  siret: '',
  company_name: '',
  company_address: '',
  company_city: '',
  certifications: '',
  vehicle_type: '',
  license_number: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const isCustomer = computed(() => isCustomerUser(userStore.user))
const isMerchant = computed(() => isMerchantUser(userStore.user))
const isServiceAgent = computed(() => isServiceAgentUser(userStore.user))
const isDeliveryAgent = computed(() => isDeliveryAgentUser(userStore.user))
const isProfessional = computed(() => isMerchant.value || isServiceAgent.value || isDeliveryAgent.value)

const loadUserData = () => {
  const user = userStore.user
  
  if (!user || Object.keys(user).length === 0) return

  formData.value.email = user.email

  if (isCustomerUser(user)) {
    const customer = user.customer
    formData.value.first_name = customer.first_name
    formData.value.last_name = customer.last_name
    formData.value.phone_number = customer.phone_number
    formData.value.address_1 = customer.address_1 || ''
    formData.value.address_2 = customer.address_2 || ''
    formData.value.postal_code = customer.postal_code || ''
    formData.value.city = customer.city || ''
  } else if (isMerchantUser(user)) {
    const merchant = user.merchant
    formData.value.first_name = merchant.first_name
    formData.value.last_name = merchant.last_name
    formData.value.phone_number = merchant.phone_number
    formData.value.siret = merchant.siret
    formData.value.company_name = merchant.company_name
    formData.value.company_address = merchant.company_address
    formData.value.company_city = merchant.company_city
  } else if (isServiceAgentUser(user)) {
    const serviceAgent = user.service_agent
    formData.value.first_name = serviceAgent.first_name
    formData.value.last_name = serviceAgent.last_name
    formData.value.phone_number = serviceAgent.phone_number
    formData.value.siret = serviceAgent.siret
    formData.value.company_name = serviceAgent.company_name
    formData.value.company_address = serviceAgent.company_address
    formData.value.company_city = serviceAgent.company_city
    formData.value.certifications = serviceAgent.certifications || ''
  } else if (isDeliveryAgentUser(user)) {
    const deliveryAgent = user.delivery_agent
    formData.value.first_name = deliveryAgent.first_name
    formData.value.last_name = deliveryAgent.last_name
    formData.value.phone_number = deliveryAgent.phone_number
    formData.value.siret = deliveryAgent.siret
    formData.value.company_name = deliveryAgent.company_name
    formData.value.company_address = deliveryAgent.company_address
    formData.value.company_city = deliveryAgent.company_city || ''
    formData.value.vehicle_type = deliveryAgent.vehicle_type
    formData.value.license_number = deliveryAgent.license_number || ''
  }
}

const updateProfile = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const user = userStore.user
    if (!user || Object.keys(user).length === 0) {
      throw new Error('Utilisateur non connecté')
    }

    let updateData: any = {}
    let endpoint = ''

    if (isCustomerUser(user)) {
      updateData = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        phone_number: formData.value.phone_number,
        address_1: formData.value.address_1,
        address_2: formData.value.address_2,
        postal_code: formData.value.postal_code,
        city: formData.value.city
      }
      endpoint = `customers/${user.customer_id}`
    } else if (isMerchantUser(user)) {
      updateData = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        phone_number: formData.value.phone_number,
        siret: formData.value.siret,
        company_name: formData.value.company_name,
        company_address: formData.value.company_address,
        company_city: formData.value.company_city
      }
      endpoint = `merchants/${user.merchant_id}`
    } else if (isServiceAgentUser(user)) {
      updateData = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        phone_number: formData.value.phone_number,
        siret: formData.value.siret,
        company_name: formData.value.company_name,
        company_address: formData.value.company_address,
        company_city: formData.value.company_city,
        certifications: formData.value.certifications
      }
      endpoint = `service-agents/${user.service_agent_id}`
    } else if (isDeliveryAgentUser(user)) {
      updateData = {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        phone_number: formData.value.phone_number,
        siret: formData.value.siret,
        company_name: formData.value.company_name,
        company_address: formData.value.company_address,
        company_city: formData.value.company_city,
        vehicle_type: formData.value.vehicle_type,
        license_number: formData.value.license_number
      }
      endpoint = `delivery-agents/${user.delivery_agent_id}`
    }

    await axios.put(endpoint, updateData)
    
    await userStore.fetchUser()
    
    successMessage.value = 'Profil mis à jour avec succès'
  } catch (e: any) {
    const { message } = getAxiosError(e)
    errorMessage.value = message || 'Une erreur est survenue lors de la mise à jour'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  loadUserData()
  successMessage.value = ''
  errorMessage.value = ''
}

onMounted(() => {
  loadUserData()
})
</script>
