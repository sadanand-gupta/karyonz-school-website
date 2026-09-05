<script setup>
import { asset } from '../lib/asset.js'
import { pillars } from '../data/school.js'

const tiles = [
  'bg-sun-100 text-sun-600',
  'bg-coral-100 text-coral-600',
  'bg-aqua-100 text-aqua-600',
]

// Two photos rather than one: a tall primary shot with a smaller second frame
// overlapping its lower corner. The pair fills the column height that the
// three stacked pillar cards occupy on the right, so neither side is left
// with dead space. On a phone the second frame is hidden entirely — the
// column is already tall once the cards stack under it.
const photos = [
  { src: asset('assets/classroom_play.jpg'), alt: 'Karyonz School classroom activity' },
  { src: asset('assets/student_activities.jpg'), alt: 'Children doing fine motor skill activities' },
]
</script>

<template>
  <section id="about" class="relative overflow-hidden py-16 scroll-mt-16 bg-surface-base">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      <!-- photo pair, matching the hero's framing treatment -->
      <div v-reveal:right class="relative w-full max-w-md mx-auto md:max-w-none md:pb-16 md:pr-10">
        <div class="relative overflow-hidden aspect-[4/5] ring-1 ring-surface-line">
          <img
            :src="photos[0].src"
            :alt="photos[0].alt"
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Desktop only: overlaps the primary frame's lower corner. On a
             phone it is dropped rather than stacked, so the section leads
             with a single photo. -->
        <div
          class="hidden md:block absolute bottom-0 right-0 w-1/2 overflow-hidden
                 aspect-square ring-4 ring-surface-base"
        >
          <img
            :src="photos[1].src"
            :alt="photos[1].alt"
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

        <!-- One card per row: three pillars in a two-up grid always leaves the
             last one orphaned beside a gap. -->
        <div class="mt-8 space-y-4">
          <div
            v-for="(p, i) in pillars"
            :key="p.title"
            v-reveal="i"
            class="bg-white border border-surface-line p-5 flex items-start gap-4"
          >
            <div :class="['tile-icon shrink-0 w-14 text-2xl', tiles[i % tiles.length]]">{{ p.icon }}</div>
            <div>
              <h3 class="display-heading text-ink-800 text-lg">{{ p.title }}</h3>
              <p class="text-ink-400 text-sm mt-1.5 leading-relaxed">{{ p.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
