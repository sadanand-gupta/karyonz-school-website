<script setup>
import { facilities } from '../data/school.js'

const titles = ['Safe play spaces', 'Hygienic campus', 'Celebrations', 'Expert teachers']
</script>

<template>
  <section id="facilities" class="relative overflow-hidden py-16 scroll-mt-16 bg-surface-base">
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(42rem 28rem at -6% 110%, rgba(53, 80, 127, 0.10), transparent 62%)"
    ></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
      <div v-reveal:right>
        <p class="script-label">Our core value</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl leading-tight mt-1">
          Built for young learners to thrive
        </h2>
        <p class="mt-4 text-ink-400 leading-relaxed max-w-md">
          Every corner of our campus is designed with one goal — a safe, stimulating space where
          children feel comfortable enough to explore and learn.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 gap-x-8 gap-y-10">
        <div
          v-for="(f, i) in facilities"
          :key="f.text"
          v-reveal:left="i"
          class="flex items-start gap-5 bg-white border border-surface-line p-5"
        >
          <div class="tile-icon w-14 shrink-0 display-heading text-lg bg-aqua-100 text-aqua-600">
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
