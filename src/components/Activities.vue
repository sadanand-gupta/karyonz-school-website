<script setup>
import { activities } from '../data/school.js'
</script>

<template>
  <section class="bg-surface-base py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Enrichment</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Beyond the classroom</h2>
        <p class="mt-4 text-ink-400">
          Alongside our core batches, children explore activities that build creativity, discipline,
          and physical coordination.
        </p>
      </div>

      <div class="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <div
          v-for="(a, i) in activities"
          :key="a.name"
          v-reveal:scale="i"
          class="text-center bg-white border border-surface-line py-6 px-3"
        >
          <div class="tile-icon w-14 mx-auto text-2xl bg-surface-alt">{{ a.icon }}</div>
          <p class="display-heading text-ink-800 text-sm mt-3">{{ a.name }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
