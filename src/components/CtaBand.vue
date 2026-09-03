<script setup>
import { school } from '../data/school.js'
</script>

<template>
  <section class="py-12">
    <div
      v-reveal
      class="relative overflow-hidden max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div
        class="relative rounded-[2rem] bg-sunny-400 px-8 sm:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left overflow-hidden"
      >
        <span class="deco-ring w-40 h-40 border-[14px] border-white/20 -right-10 -top-12"></span>
        <span class="deco-ring w-20 h-20 border-8 border-white/20 right-40 -bottom-8"></span>

        <div class="relative">
          <h2 class="display-heading text-white text-2xl sm:text-3xl">
            How to enrol your child at Karyonz?
          </h2>
          <p class="text-white/90 mt-2">
            Looking for a warm, safe first school in Singampunari? We'd love to show you around.
          </p>
        </div>
        <a
          :href="school.phoneHref"
          class="relative shrink-0 rounded-full bg-white text-ink-800 font-bold px-9 py-4 shadow-lg hover:-translate-y-0.5 transition-all"
        >
          Call Admissions Desk
        </a>
      </div>
    </div>
  </section>
</template>
