<template>
  <div class="relative isolate overflow-hidden">
    <svg
      class="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
          width="200"
          height="200"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          stroke-width="0"
        />
      </svg>
      <rect
        width="100%"
        height="100%"
        stroke-width="0"
        fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
      />
    </svg>
    <div
      class="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]"
      aria-hidden="true"
    >
      <div
        class="aspect-1108/632 w-277 bg-linear-to-r from-[#2a523b] to-[#8b408a] opacity-30"
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
    <div
      class="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-30"
    >
      <div class="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
        <h1
          class="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl"
        >
          Simplifiez vos livraisons et services du quotidien
        </h1>
        <p
          class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
        >
          Ecodeli connecte particuliers et professionnels pour un transport de
          colis écoresponsable et des services personnalisés à domicile... le
          tout en toute confiance.
        </p>
        <div class="mt-10 flex items-center gap-x-6">
          <router-link
            :to="{ name: 'Login' }"
            class="rounded-md bg-primary-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400"
            >Commencer</router-link
          >
          <a href="#" class="text-sm/6 font-semibold text-gray-900"
            >En savoir plus <span aria-hidden="true">→</span></a
          >
        </div>
      </div>
      <div
        class="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32"
      >
        <div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <img
            src="/home.png"
            alt="App screenshot"
            width="2432"
            height="1442"
            class="w-304 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mx-auto mt-8 max-w-7xl px-6 sm:mt-8 lg:px-8">
    <h2 class="text-center text-lg/8 font-semibold text-gray-900">
      Utilisés par des entreprises de confiance
    </h2>
    <div
      class="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
    >
      <img
        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        src="https://tailwindcss.com/plus-assets/img/logos/158x48/transistor-logo-gray-400.svg"
        alt="Transistor"
        width="158"
        height="48"
      />
      <img
        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        src="https://tailwindcss.com/plus-assets/img/logos/158x48/reform-logo-gray-400.svg"
        alt="Reform"
        width="158"
        height="48"
      />
      <img
        class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
        src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-gray-400.svg"
        alt="Tuple"
        width="158"
        height="48"
      />
      <img
        class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
        src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-gray-400.svg"
        alt="SavvyCal"
        width="158"
        height="48"
      />
      <img
        class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
        src="https://tailwindcss.com/plus-assets/img/logos/158x48/statamic-logo-gray-400.svg"
        alt="Statamic"
        width="158"
        height="48"
      />
    </div>
  </div>
</template>
