<script setup>
import { activities } from '../data/school.js'

const tiles = [
  'bg-sunny-200',
  'bg-pink-200',
  'bg-sky-200',
  'bg-lime-100',
  'bg-coral-100',
]
</script>

<template>
  <section class="bg-cream py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Enrichment</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Beyond the classroom</h2>
        <p class="mt-4 text-ink-400">
          Alongside our core batches, children explore activities that build creativity, discipline,
          and physical coordination.
        </p>
      </div>

      <div class="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="(a, i) in activities"
          :key="a.name"
          v-reveal="i"
          class="rounded-2xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all p-5 text-center"
        >
          <div :class="['tile-icon w-14 mx-auto text-2xl', tiles[i % tiles.length]]">{{ a.icon }}</div>
          <p class="display-heading text-ink-800 text-sm mt-3">{{ a.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
