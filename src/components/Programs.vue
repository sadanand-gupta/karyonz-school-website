<script setup>
import { programs } from '../data/school.js'

// Real campus photos paired with each batch, plus the dome badge colour.
const cards = {
  Playgroup: { photo: '/assets/learning_moments.jpg', dome: 'bg-sunny-400' },
  Nursery: { photo: '/assets/classroom_play.jpg', dome: 'bg-sky-400' },
  LKG: { photo: '/assets/student_activities.jpg', dome: 'bg-coral-400' },
  UKG: { photo: '/assets/campus_view.jpg', dome: 'bg-pink-400' },
}
</script>

<template>
  <section id="batches" class="relative overflow-hidden bg-cream py-20 scroll-mt-20">
    <div class="pointer-events-none absolute -top-72 -right-80 w-[46rem] h-[46rem] rounded-full border-[6rem] border-pink-100"></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Curriculum</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Our programs</h2>
      </div>

      <div class="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <article v-for="(p, i) in programs" :key="p.name" v-reveal="i" class="group text-center">
          <div class="relative rounded-2xl overflow-hidden shadow-md">
            <img
              :src="cards[p.name].photo"
              :alt="`${p.name} at Karyonz School`"
              class="w-full aspect-4/3 object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div
              :class="['age-dome absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-[4.6rem] grid place-items-center pt-3 text-white', cards[p.name].dome]"
            >
              <div class="leading-none">
                <p class="font-bold text-base whitespace-nowrap">{{ p.ageGroup.replace(/Ages | Years/g, '').trim() }}</p>
                <p class="text-[0.65rem] font-semibold tracking-[0.15em] mt-0.5">YEARS</p>
              </div>
            </div>
          </div>

          <h3 class="display-heading text-ink-800 text-xl mt-5">{{ p.name }}</h3>
          <p class="text-ink-400 text-sm mt-2 leading-relaxed">{{ p.description }}</p>

          <a
            href="#contact"
            :aria-label="`Enquire about ${p.name}`"
            class="mt-5 w-11 h-11 mx-auto grid place-items-center rounded-full bg-white text-ink-800 shadow-md hover:bg-sunny-400 hover:text-white hover:-translate-y-1 transition-all"
          >
            →
          </a>
        </article>
      </div>

      <div
        v-reveal
        class="mt-14 rounded-3xl bg-white shadow-sm p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
      >
        <span class="tile-icon w-16 shrink-0 bg-sunny-200 text-3xl">🕐</span>
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
