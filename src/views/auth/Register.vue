<template>
  <div class="relative isolate bg-white min-h-screen">
    <div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3">
      <div
        class="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48 lg:col-span-1"
      >
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <div
            class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/3"
          >
            <svg
              class="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                  width="200"
                  height="200"
                  x="100%"
                  y="-1"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M130 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" stroke-width="0" fill="white" />
              <svg x="100%" y="-1" class="overflow-visible fill-gray-50">
                <path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
              </svg>
              <rect
                width="100%"
                height="100%"
                stroke-width="0"
                fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
              />
            </svg>
          </div>

          <ProgressTracker />
        </div>
      </div>

      <div class="lg:col-span-2 lg:py-48 px-6 pt-20 pb-24 sm:pb-32 lg:px-8">
        <!-- <h2
          class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"
        >
          Inscription
        </h2> -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressTracker from "@/components/ProgressTracker.vue";
</script>
