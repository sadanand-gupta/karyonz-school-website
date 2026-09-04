<script setup>
// Counting is handled by NumberTicker (Magic UI, on motion-v) — a spring per
// figure rather than a hand-rolled GSAP tween.
import { stats } from '../data/school.js'
import NumberTicker from './ui/NumberTicker.vue'
import BlurFade from './ui/BlurFade.vue'
</script>

<template>
  <section class="py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <!-- The one dark band on the page, so the numbers land. No card, no
           shadow — a flat block of colour edge to edge. -->
      <div class="relative bg-surface-deep px-6 sm:px-10 py-12">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-10 divide-white/10 lg:divide-x">
          <BlurFade
            v-for="(s, i) in stats"
            :key="s.label"
            :delay="i * 0.08"
            class="text-center px-2 lg:px-6"
          >
            <p class="display-heading text-white text-4xl sm:text-5xl">
              <NumberTicker :value="s.value" :decimals="s.decimals || 0" :suffix="s.suffix" :delay="i * 0.08" />
            </p>
            <p class="text-white/60 text-sm font-medium mt-2 tracking-wide">{{ s.label }}</p>
          </BlurFade>
        </div>
      </div>
    </div>
  </section>
</template>
