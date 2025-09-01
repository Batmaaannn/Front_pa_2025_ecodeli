<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Mes rendez-vous</h2>
      <p class="text-gray-600">
        Liste de toutes vos prestations à venir
      </p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">
          Vos prochains rendez-vous
        </h3>
      </div>

      <div class="divide-y divide-gray-200">
        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7l4-4 4 4m0 6l-4 4-4-4"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">
                  Transport vers aéroport CDG
                </h4>
                <p class="text-sm text-gray-600 mt-1">Marc Dubois</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Demain, 6h30
                </div>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                Confirmé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">35€</p>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">
                  Garde d'animaux pendant déplacement
                </h4>
                <p class="text-sm text-gray-600 mt-1">Pierre Leroy</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Jeudi, 9h00 - 18h00
                </div>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
              >
                En attente
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">60€</p>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">
                  Ménage ponctuel appartement
                </h4>
                <p class="text-sm text-gray-600 mt-1">Fatima Benali</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Vendredi, 9h00 - 12h00
                </div>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                Confirmé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">45€</p>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">
                  Courses alimentaires hebdomadaires
                </h4>
                <p class="text-sm text-gray-600 mt-1">Julie Moreau</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Samedi, 10h00
                </div>
              </div>
            </div>
            <div class="text-right">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                Confirmé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">14€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
