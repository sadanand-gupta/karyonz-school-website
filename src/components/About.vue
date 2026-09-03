<script setup>
import { pillars } from '../data/school.js'

const tiles = [
  'bg-sunny-200 text-sunny-500',
  'bg-pink-200 text-pink-500',
  'bg-sky-200 text-sky-600',
]
</script>

<template>
  <section id="about" class="relative overflow-hidden py-20 scroll-mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-14 items-center">
      <!-- blob photo with floating rings -->
      <div v-reveal class="relative">
        <div class="blob-mask-alt aspect-square shadow-2xl">
          <img
            src="/assets/classroom_play.jpg"
            alt="Karyonz School classroom activity"
            class="w-full h-full object-cover"
          />
        </div>
        <span class="deco-ring w-20 h-20 border-8 border-ink-400 -left-4 top-1/2 animate-float"></span>
        <span class="deco-ring w-28 h-28 border-[11px] border-sunny-400 left-14 -bottom-6 animate-float" style="animation-delay: 1.2s"></span>
        <span class="deco-ring w-9 h-9 border-4 border-pink-400 left-2 bottom-24"></span>
        <span class="deco-ring w-4 h-4 bg-coral-400 border-0 right-1/4 -top-1"></span>
      </div>

      <div>
        <div v-reveal>
          <p class="script-label">Who we are</p>
          <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl leading-tight mt-1">
            A safe, joyful start<br class="hidden sm:block" />
            for your child
          </h2>
          <p class="mt-4 text-ink-400 leading-relaxed">
            Karyonz sits in the heart of Singampunari, combining CBSE classroom preparation with
            interactive play — so every child builds a strong foundation without losing the joy of
            being a child.
          </p>
        </div>

        <div class="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-9">
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
