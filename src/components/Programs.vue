<script setup>
import { asset } from '../lib/asset.js'
import { programs } from '../data/school.js'

// Real campus photos paired with each batch, plus the dome badge colour.
const cards = {
  Playgroup: { photo: asset('assets/learning_moments.jpg') },
  Nursery: { photo: asset('assets/classroom_play.jpg') },
  LKG: { photo: asset('assets/student_activities.jpg') },
  UKG: { photo: asset('assets/campus_view.jpg') },
}
</script>

<template>
  <section id="batches" class="relative overflow-hidden bg-surface-alt py-16 scroll-mt-16">
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(44rem 30rem at 96% -10%, rgba(192, 130, 104, 0.10), transparent 62%)"
    ></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Curriculum</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Our programs</h2>
      </div>

      <div class="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <article
          v-for="(p, i) in programs"
          :key="p.name"
          v-reveal:scale="i"
          class="group text-center bg-white border border-surface-line"
        >
          <div class="relative overflow-hidden">
            <img
              :src="cards[p.name].photo"
              :alt="`${p.name} at Karyonz School`"
              class="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <span
              class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink-900/80 backdrop-blur px-4 py-1.5 text-white text-sm font-semibold whitespace-nowrap ring-1 ring-white/15"
            >
              {{ p.ageGroup.replace(/Ages /, '') }}
            </span>
          </div>

          <div class="px-5 pb-6">
            <h3 class="display-heading text-ink-800 text-xl mt-5">{{ p.name }}</h3>
            <p class="text-ink-400 text-sm mt-2 leading-relaxed">{{ p.description }}</p>
          </div>
        </article>
      </div>

      <div
        v-reveal
        class="mt-10 bg-white border border-surface-line p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
      >
        <span class="tile-icon w-16 shrink-0 bg-sun-200 text-3xl">🕐</span>
        <div>
          <p class="display-heading text-ink-800 text-lg">Supervised Daycare &amp; After-School Program</p>
          <p class="text-ink-400 text-sm mt-1">
            Extended, supervised care for working parents — because your child's safety shouldn't end when class does.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
