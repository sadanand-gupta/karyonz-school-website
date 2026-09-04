<script setup>
import { school } from '../data/school.js'
import BlurFade from './ui/BlurFade.vue'
</script>

<template>
  <section class="py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <BlurFade
        class="bg-sun-300 px-8 sm:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div>
          <h2 class="display-heading text-ink-900 text-2xl sm:text-3xl">
            How to enrol your child at Karyonz?
          </h2>
          <p class="text-ink-800 mt-2">
            Looking for a warm, safe first school in Singampunari? We'd love to show you around.
          </p>
        </div>
        <a
          :href="school.phoneHref"
          class="shrink-0 text-ink-900 font-semibold text-lg border-b-2 border-ink-900/40 hover:border-ink-900 pb-1 transition-colors whitespace-nowrap"
        >
          {{ school.phone }}
        </a>
      </BlurFade>
    </div>
  </section>
</template>
