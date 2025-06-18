<template>
  <div class="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
    <svg
      class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="1d4240dd-898f-445f-932d-e2872fd12de3"
          width="200"
          height="200"
          x="50%"
          y="0"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="0" class="overflow-visible fill-gray-50">
        <path
          d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
      />
    </svg>
    <div
      class="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-1108/632 w-277 flex-none bg-linear-to-r from-[#2a523b] to-[#8b408a] opacity-20"
        style="
          clip-path: polygon(
            73.6% 51.7%,
            91.7% 11.8%,
            100% 46.4%,
            97.4% 82.2%,
            92.5% 84.9%,
            75.7% 64%,
            55.3% 47.5%,
            46.5% 49.4%,
            45% 62.9%,
            50.3% 87.2%,
            21.3% 64.1%,
            0.1% 100%,
            5.4% 51.1%,
            21.4% 63.9%,
            58.9% 0.2%,
            73.6% 51.7%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2
        class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
      >
        Gagnez du temps. Rejoignez EcoDeli dès aujourd’hui.
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-lg/8 text-gray-500">
        Que vous souhaitiez livrer, proposer vos services ou bénéficier d'une
        aide locale, notre plateforme vous connecte aux bonnes personnes en
        toute simplicité.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          :to="{ name: 'Signin' }"
          class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >Je m'inscris</router-link
        >
        <!-- <a href="#" class="text-sm/6 font-semibold text-gray-900"
          >Je suis un professionnel <span aria-hidden="true">→</span></a
        > -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
