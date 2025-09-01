<template>
  <div class="dashboard-patient">
    <ConnecterSidebar :navigation="navigation" />
    <div class="lg:pl-72">

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <div v-if="$route.name === 'DashboardAdmin'">
            <div class="mb-6">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
              <p class="text-gray-600">Vue d'ensemble des validations et activités EcoDeli</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span class="text-red-600 font-bold text-sm">!</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-red-800">Nouvelles prestations</p>
                    <p class="text-2xl font-bold text-red-900">{{ pendingValidations.newServices }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span class="text-orange-600 font-bold text-sm">U</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-orange-800">Validations users</p>
                    <p class="text-2xl font-bold text-orange-900">{{ pendingValidations.pendingUsers }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span class="text-yellow-600 font-bold text-sm">M</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-yellow-800">Validations merchant</p>
                    <p class="text-2xl font-bold text-yellow-900">{{ pendingValidations.pendingMerchants }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-blue-600 font-bold text-sm">T</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-blue-800">Tickets urgents</p>
                    <p class="text-2xl font-bold text-blue-900">{{ pendingValidations.urgentTickets }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div class="bg-white shadow rounded-lg p-6">
                <dt class="text-sm font-medium text-gray-500">Tickets traités</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.ticketsProcessed }}</dd>
              </div>

              <div class="bg-white shadow rounded-lg p-6">
                <dt class="text-sm font-medium text-gray-500">Tickets en attente</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.ticketsUnprocessed }}</dd>
              </div>

              <div class="bg-white shadow rounded-lg p-6">
                <dt class="text-sm font-medium text-gray-500">Satisfaction client</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.satisfactionRating }}/5</dd>
              </div>

              <div class="bg-white shadow rounded-lg p-6">
                <dt class="text-sm font-medium text-gray-500">Assurances en cours</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.insuranceClaims }}</dd>
              </div>

              <div class="bg-white shadow rounded-lg p-6">
                <dt class="text-sm font-medium text-gray-500">Utilisation entrepôts</dt>
                <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stats.warehouseUtilization }}%</dd>
              </div>
            </div>

            <div class="bg-white shadow rounded-lg mb-8">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Capacité de stockage par location</h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div 
                    v-for="warehouse in warehouseData" 
                    :key="warehouse.location"
                    class="border rounded-lg p-4"
                    :class="{
                      'border-red-300 bg-red-50': warehouse.status === 'critical',
                      'border-yellow-300 bg-yellow-50': warehouse.status === 'low',
                      'border-green-300 bg-green-50': warehouse.status === 'normal'
                    }"
                  >
                    <div class="flex justify-between items-center mb-2">
                      <h4 class="font-medium text-gray-900">{{ warehouse.location }}</h4>
                      <span 
                        class="text-sm px-2 py-1 rounded"
                        :class="{
                          'bg-red-100 text-red-800': warehouse.status === 'critical',
                          'bg-yellow-100 text-yellow-800': warehouse.status === 'low',
                          'bg-green-100 text-green-800': warehouse.status === 'normal'
                        }"
                      >
                        {{ warehouse.utilization }}%
                      </span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="h-2 rounded-full"
                        :class="{
                          'bg-red-500': warehouse.status === 'critical',
                          'bg-yellow-500': warehouse.status === 'low',
                          'bg-green-500': warehouse.status === 'normal'
                        }"
                        :style="{ width: warehouse.utilization + '%' }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-white shadow rounded-lg">
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">Actions rapides</h3>
              </div>
              <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <router-link to="/admin/validation-livreurs" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <div class="text-blue-600 font-medium">Validation livreurs</div>
                    <div class="text-sm text-gray-500">8 en attente</div>
                  </router-link>

                  <router-link to="/admin/validation-prestataires" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <div class="text-green-600 font-medium">Validation prestataires</div>
                    <div class="text-sm text-gray-500">3 en attente</div>
                  </router-link>

                  <router-link to="/admin/validation-commercants" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <div class="text-orange-600 font-medium">Validation commerçants</div>
                    <div class="text-sm text-gray-500">5 en attente</div>
                  </router-link>

                  <router-link to="/admin/tickets-urgents" class="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                    <div class="text-red-600 font-medium">Tickets urgents</div>
                    <div class="text-sm text-gray-500">3 à traiter</div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import ConnecterSidebar from "@/components/layouts/menus/ConnectedSidebar.vue";
import { HomeIcon } from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Accueil", href: "DashboardAdmin", icon: HomeIcon, current: true },
  {
    name: "Livreurs",
    href: "DeliveryAgentList",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Prestataires de services",
    href: "ServiceAgentList",
    icon: HomeIcon,
    current: false,
  },
];

const pendingValidations = {
  newServices: 12,
  pendingUsers: 8,
  pendingMerchants: 5,
  urgentTickets: 3
};

const stats = {
  ticketsProcessed: 142,
  ticketsUnprocessed: 23,
  satisfactionRating: 4.7,
  insuranceClaims: 7,
  warehouseUtilization: 73
};

const warehouseData = [
  { location: 'Paris', utilization: 85, status: 'normal' },
  { location: 'Marseille', utilization: 62, status: 'normal' },
  { location: 'Lyon', utilization: 78, status: 'normal' },
  { location: 'Lille', utilization: 45, status: 'low' },
  { location: 'Montpellier', utilization: 92, status: 'critical' },
  { location: 'Rennes', utilization: 38, status: 'low' }
];
</script>