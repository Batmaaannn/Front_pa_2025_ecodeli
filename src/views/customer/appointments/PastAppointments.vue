<template>
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Rendez-vous passés</h2>
      <p class="text-gray-600">Liste de vos rendez-vous terminés</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Vos rendez-vous terminés</h3>
      </div>
      
      <div class="divide-y divide-gray-200">
        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Accompagnement rendez-vous médical</h4>
                <p class="text-sm text-gray-600 mt-1">Sophie Martin</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  Hier, 14h30 - Cabinet Dr. Leroux
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">18€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Courses alimentaires hebdomadaires</h4>
                <p class="text-sm text-gray-600 mt-1">Julie Moreau</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  Il y a 3 jours, 10h00 - Carrefour Beaugrenelle
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">14€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Jardinage léger - Entretien balcon</h4>
                <p class="text-sm text-gray-600 mt-1">Laurent Petit</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  La semaine dernière, 8h00 - Balcon 3ème étage
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">15€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(4/5)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4 4 4m0 6l-4 4-4-4"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Transport vers gare Montparnasse</h4>
                <p class="text-sm text-gray-600 mt-1">Marc Dubois</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  Il y a 2 semaines, 7h15 - Départ TGV
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">28€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Ménage ponctuel après déménagement</h4>
                <p class="text-sm text-gray-600 mt-1">Fatima Benali</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  Il y a 1 mois, 9h00 - 15h00 - Appartement 3 pièces
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">85€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(5/5)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 hover:bg-gray-50 transition-colors">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-base font-medium text-gray-900">Petits travaux ménagers pendant déplacement</h4>
                <p class="text-sm text-gray-600 mt-1">Antoine Dubois</p>
                <div class="flex items-center mt-2 text-sm text-gray-500">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                  Il y a 2 mois, 13h00 - 17h00 - Réparations diverses
                </div>
              </div>
            </div>
            <div class="text-right">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Terminé
              </span>
              <p class="text-base font-semibold text-gray-900 mt-1">55€</p>
              <div class="flex space-x-1 mt-2">
                <span class="text-yellow-400">⭐⭐⭐⭐</span>
                <span class="text-xs text-gray-500">(4/5)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-gray-50 rounded-lg p-4">
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">Total des prestations terminées :</span>
        <span class="font-semibold text-gray-900">6 services - 215€</span>
      </div>
    </div>
  </div>
</template>