<script setup>
import { facilities } from '../data/school.js'

// Numbered pastel tiles, alternating solid and dashed outlines.
const tiles = [
  { cls: 'bg-sunny-200 text-sunny-500', dashed: false },
  { cls: 'border-2 border-dashed border-sky-400 text-sky-600', dashed: true },
  { cls: 'bg-pink-200 text-pink-500', dashed: false },
  { cls: 'bg-coral-100 text-coral-500', dashed: false },
]
const titles = ['Safe play spaces', 'Hygienic campus', 'Celebrations', 'Expert teachers']
</script>

<template>
  <section id="facilities" class="relative overflow-hidden py-20 scroll-mt-20">
    <div class="pointer-events-none absolute -bottom-96 -left-72 w-[44rem] h-[44rem] rounded-full border-[5rem] border-sky-100"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
      <div v-reveal>
        <p class="script-label">Our core value</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl leading-tight mt-1">
          Built for young learners to thrive
        </h2>
        <p class="mt-4 text-ink-400 leading-relaxed max-w-md">
          Every corner of our campus is designed with one goal — a safe, stimulating space where
          children feel comfortable enough to explore and learn.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-x-8 gap-y-10">
        <div v-for="(f, i) in facilities" :key="f.text" v-reveal="i" class="flex items-start gap-5">
          <div :class="['tile-icon w-16 shrink-0 display-heading text-xl', tiles[i % tiles.length].cls]">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <div>
            <h3 class="display-heading text-ink-800 text-lg">{{ titles[i] }}</h3>
            <p class="text-ink-400 text-sm mt-1.5 leading-relaxed">{{ f.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
