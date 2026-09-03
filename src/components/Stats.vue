<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stats } from '../data/school.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
// Displayed values, counted up when the band scrolls into view.
const shown = ref(stats.map((s) => (s.decimals ? (0).toFixed(s.decimals) : 0)))

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = stats.map((s) => (s.decimals ? s.value.toFixed(s.decimals) : s.value))
    return
  }

  stats.forEach((s, i) => {
    const counter = { n: 0 }
    gsap.to(counter, {
      n: s.value,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 85%', once: true },
      onUpdate: () => {
        shown.value[i] = s.decimals ? counter.n.toFixed(s.decimals) : Math.round(counter.n)
      },
    })
  })
})
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden py-10">
    <!-- tilted orange ribbon, wider than the viewport so the ends never show -->
    <div class="relative -rotate-2 -mx-8 bg-sunny-400 py-16 shadow-lg">
      <!-- faint scattered letters and numbers -->
      <div class="pointer-events-none absolute inset-0 select-none text-white/15 font-heading font-bold" aria-hidden="true">
        <span class="absolute left-[6%] top-[28%] text-5xl">o</span>
        <span class="absolute left-[13%] top-[18%] text-6xl">3</span>
        <span class="absolute left-[4%] bottom-[22%] text-6xl">r</span>
        <span class="absolute left-[26%] bottom-[28%] text-5xl">t</span>
        <span class="absolute left-[38%] bottom-[30%] text-5xl">z</span>
        <span class="absolute left-[64%] bottom-[26%] text-6xl">9</span>
        <span class="absolute right-[16%] top-[24%] text-5xl">h</span>
        <span class="absolute right-[6%] top-[30%] text-6xl">j</span>
        <span class="absolute right-[9%] bottom-[24%] text-5xl">k</span>
      </div>
      <!-- brighter accent characters, like the reference -->
      <div class="pointer-events-none absolute inset-0 select-none font-heading font-bold" aria-hidden="true">
        <span class="absolute left-[24%] top-[16%] text-5xl text-sky-300">a</span>
        <span class="absolute left-[45%] top-[14%] text-5xl text-sunny-200">b</span>
        <span class="absolute left-[62%] top-[10%] text-4xl text-lime-300">4</span>
        <span class="absolute left-[70%] top-[22%] text-4xl text-sky-300">3</span>
        <span class="absolute right-[18%] top-[16%] text-4xl text-sunny-200">5</span>
      </div>

      <div class="relative rotate-2 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-10">
        <div v-for="(s, i) in stats" :key="s.label" v-reveal="i" class="text-center">
          <div class="blob-mask w-28 h-28 mx-auto bg-white grid place-items-center text-5xl shadow-md">
            {{ s.icon }}
          </div>
          <p class="display-heading text-white text-3xl sm:text-4xl mt-5">
            {{ shown[i] }}{{ s.suffix }}
          </p>
          <p class="text-white font-semibold mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
