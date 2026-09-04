<script setup>
import { asset } from '../lib/asset.js'
// Three real campus photos, presented as a uniform card row.
// Titles describe what the photo actually shows and map to real
// activities from the school's enrichment programme.
const items = [
  {
    icon: '🎨',
    tile: 'bg-aqua-100 text-aqua-600',
    photo: asset('assets/gallery_extra_1.jpg'),
    title: 'Art & Craft',
    text: 'Hands-on craft sessions where children paint, plant and build — part of our Art & Craft enrichment programme.',
  },
  {
    icon: '🧩',
    tile: 'bg-sun-100 text-sun-600',
    photo: asset('assets/learning_moments.jpg'),
    title: 'Creative Learning',
    text: 'Puzzles, shapes and guided play that build problem-solving, focus and fine motor skills.',
  },
  {
    icon: '⚽',
    tile: 'bg-coral-100 text-coral-600',
    photo: asset('assets/gallery_extra_2.jpg'),
    title: 'Outdoor Play',
    text: 'Open-air play and movement in our campus play area — building coordination, confidence and teamwork.',
  },
]
</script>

<template>
  <section class="relative overflow-hidden py-16 bg-gradient-to-b from-surface-alt to-surface-base">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Sports &amp; Creative Activity</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Discover · Create · Grow</h2>
        <p class="mt-4 text-ink-400 leading-relaxed">
          Every day at Karyonz mixes structured learning with hands-on making and free movement — so
          children build skills without ever feeling like they're being taught.
        </p>
      </div>

      <div class="mt-10 grid sm:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="(it, i) in items"
          :key="it.title"
          v-reveal:scale="i"
          class="group bg-white border border-surface-line"
        >
          <div class="aspect-4/3 overflow-hidden">
            <img
              :src="it.photo"
              :alt="it.title"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <div :class="['tile-icon w-11 text-xl', it.tile]">{{ it.icon }}</div>
            <h3 class="display-heading text-ink-800 text-xl mt-4">{{ it.title }}</h3>
            <p class="text-ink-400 text-sm mt-2 leading-relaxed">{{ it.text }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
