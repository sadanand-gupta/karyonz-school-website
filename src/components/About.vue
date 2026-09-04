<script setup>
import { pillars } from '../data/school.js'

const tiles = [
  'bg-sun-100 text-sun-600',
  'bg-coral-100 text-coral-600',
  'bg-aqua-100 text-aqua-700',
]
</script>

<template>
  <section id="about" class="relative overflow-hidden py-16 scroll-mt-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
      <!-- framed photo, matching the hero's treatment -->
      <div v-reveal:right class="relative w-full max-w-md mx-auto md:max-w-none">
        <div
          class="relative overflow-hidden aspect-[4/5] sm:aspect-square ring-1 ring-ink-100"
        >
          <img
            src="/assets/classroom_play.jpg"
            alt="Karyonz School classroom activity"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        <div v-reveal:left>
          <p class="script-label">Who we are</p>
          <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl leading-tight mt-1">
            A safe, joyful start<br class="hidden sm:block" />
            for your child
          </h2>
          <p class="mt-4 text-ink-400 leading-relaxed">
            Karyonz sits in the heart of Singampunari, combining CBSE classroom preparation with
            interactive play — so every child builds a strong foundation without losing the joy of
            being a child.
          </p>
        </div>

        <div class="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-8">
          <div v-for="(p, i) in pillars" :key="p.title" v-reveal="i">
            <div :class="['tile-icon w-16 text-3xl', tiles[i % tiles.length]]">{{ p.icon }}</div>
            <h3 class="display-heading text-ink-800 text-lg mt-4">{{ p.title }}</h3>
            <p class="text-ink-400 text-sm mt-2 leading-relaxed">{{ p.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
