<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-primary-600">Nos prix</h2>
        <p class="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
          Partez sur de bonnes bases et améliorez-vous petit à petit
        </p>
      </div>
      <p class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        Que vous soyez client, livreur, commerçant ou prestataire, ces offres sont faites pour vous.
      </p>

      <!-- xs to lg -->
      <div class="mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden">
        <section
          v-for="tier in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular
              ? 'rounded-xl bg-gray-400/5 ring-1 ring-gray-200 ring-inset'
              : '',
            'p-8',
          ]">
          <h3 :id="tier.id" class="text-sm/6 font-semibold text-gray-900">
            {{ tier.name }}
          </h3>
          <p class="mt-2 flex items-baseline gap-x-1 text-gray-900">
            <span class="text-4xl font-semibold">{{ tier.priceMonthly }}</span>
            <span class="text-sm font-semibold">/ mois</span>
          </p>
          <a
            :href="tier.href"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-primary-600 text-white hover:bg-primary-500'
                : 'text-primary-600 ring-1 ring-primary-200 ring-inset hover:ring-primary-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
            ]">Acheter</a>
          <ul role="list" class="mt-10 space-y-4 text-sm/6 text-gray-900">
            <li v-for="section in sections" :key="section.name">
              <ul role="list" class="space-y-4">
                <template
                  v-for="feature in section.features"
                  :key="feature.name"
                >
                  <li v-if="feature.tiers[tier.name]" class="flex gap-x-3">
                    <CheckIcon
                      class="h-6 w-5 flex-none text-primary-600"
                      aria-hidden="true"
                    />
                    <span>
                      {{ feature.name }}
                      {{ " " }}
                      <span
                        v-if="typeof feature.tiers[tier.name] === 'string'"
                        class="text-sm/6 text-gray-500"
                        >({{ feature.tiers[tier.name] }})</span
                      >
                    </span>
                  </li>
                </template>
              </ul>
            </li>
          </ul>
        </section>
      </div>

      <!-- lg+ -->
      <div class="isolate mt-20 hidden lg:block">
        <div class="relative -mx-8">
          <div
            v-if="tiers.some((tier) => tier.mostPopular)"
            class="absolute inset-x-4 inset-y-0 -z-10 flex"
          >
            <div
              class="flex w-1/3 px-4"
              aria-hidden="true"
              :style="{
                marginLeft: `${(tiers.findIndex((tier) => tier.mostPopular)) * 100 / 3}%`,
                transform: `translateY(16px)`,
              }"
            >
              <div class="w-full rounded-xl border border-gray-900/10 bg-gray-400/5" />
            </div>
          </div>
          <table class="w-full table-fixed border-separate border-spacing-x-8 text-left">
            <colgroup>
              <col class="w-1/3" />
              <col class="w-1/3" />
              <col class="w-1/3" />
            </colgroup>
            <thead>
              <tr>
                <th
                  v-for="tier in tiers"
                  :key="tier.id"
                  scope="col"
                  class="px-6 pt-6 xl:px-8 xl:pt-8"
                >
                  <div class="text-sm/7 font-semibold text-gray-900">
                    {{ tier.name }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  v-for="tier in tiers"
                  :key="tier.id"
                  class="px-6 pt-2 xl:px-8"
                >
                  <div class="flex items-baseline gap-x-1 text-gray-900">
                    <span class="text-4xl font-semibold">{{
                      tier.priceMonthly
                    }}</span>
                    <span class="text-sm/6 font-semibold">/ mois</span>
                  </div>
                  <a
                    :href="tier.href"
                    :class="[
                      tier.mostPopular
                        ? 'bg-primary-600 text-white hover:bg-primary-500'
                        : 'text-primary-600 ring-1 ring-primary-200 ring-inset hover:ring-primary-300',
                      'mt-8 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600',
                    ]"
                    >Acheter</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, MinusIcon } from "@heroicons/vue/20/solid";

const tiers = [
  {
    name: "Gratuit",
    id: "gratuit",
    href: "/connexion",
    priceMonthly: "0€",
    mostPopular: false,
  },
  {
    name: "Starter",
    id: "starter",
    href: "/connexion",
    priceMonthly: "9,90€",
    mostPopular: true,
  },
  {
    name: "Scale",
    id: "tier-scale",
    href: "/connexion",
    priceMonthly: "19,99€",
    mostPopular: false,
  },
];
const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Edge content delivery",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Custom domains",
        tiers: { Starter: "1", Growth: "3", Scale: "Unlimited" },
      },
      {
        name: "Team members",
        tiers: { Starter: "3", Growth: "20", Scale: "Unlimited" },
      },
      {
        name: "Single sign-on (SSO)",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Advanced analytics",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Basic reports",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
      {
        name: "Professional reports",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
      {
        name: "Custom report builder",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "24/7 online support",
        tiers: { Starter: true, Growth: true, Scale: true },
      },
      {
        name: "Quarterly workshops",
        tiers: { Starter: false, Growth: true, Scale: true },
      },
      {
        name: "Priority phone support",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
      {
        name: "1:1 onboarding tour",
        tiers: { Starter: false, Growth: false, Scale: true },
      },
    ],
  },
];
</script>
