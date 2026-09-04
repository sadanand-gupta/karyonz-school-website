<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { school } from '../data/school.js'
import ActionButton from './ui/ActionButton.vue'

// Two full-bleed campus photos that cross-fade behind the headline.
// Both are landscape shots that still read well when cropped tall on a phone.
const heroSlides = [
  { src: '/assets/hero_bg.webp', alt: "Karyonz School children at the Children's Day celebration" },
  { src: '/assets/campus_view.jpg', alt: 'Karyonz School students in uniform by the painted campus mural' },
]

// Short, verifiable reassurances under the CTAs — the kind of thing a parent
// scans for before they decide to call.
const trustPoints = ['CBSE-aligned foundation', 'Ages 2 – 6 years', 'Singampunari campus']

const activeSlide = ref(0)
let slideTimer = null

function startAutoplay() {
  clearInterval(slideTimer)
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, 6000)
}

// Tapping a dot should show that slide and reset the clock, so the photo
// doesn't flip away a moment after the parent picked it.
function selectSlide(i) {
  activeSlide.value = i
  if (slideTimer) startAutoplay()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  startAutoplay()

  // The headline animates itself, word by word, via v-text-animate — this
  // timeline handles everything around it and is paced to interleave.
  gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 }, delay: 0.15 })
    .from('.hero-badge', { opacity: 0, y: 14, filter: 'blur(6px)' })
    .from('.hero-script', { opacity: 0, y: 16, filter: 'blur(6px)' }, '-=0.6')
    .from('.hero-subtitle', { opacity: 0, y: 18, filter: 'blur(6px)' }, '+=0.35')
    .from('.hero-ctas', { opacity: 0, y: 18 }, '-=0.6')
    .from('.hero-trust', { opacity: 0, y: 14 }, '-=0.6')
    .from('.hero-controls', { opacity: 0, duration: 0.6 }, '-=0.4')
    .set(['.hero-badge', '.hero-script', '.hero-subtitle'], { clearProps: 'filter' })

  // A slow push-in on the backdrop. Barely perceptible frame to frame, but it
  // stops the hero feeling like a still photograph.
  gsap.to('.hero-bg', { scale: 1.08, duration: 20, ease: 'sine.inOut', repeat: -1, yoyo: true })
})

onUnmounted(() => clearInterval(slideTimer))
</script>

<template>
  <section id="top" class="relative min-h-svh flex items-center overflow-hidden bg-ink-900">
    <!-- background slides -->
    <div class="absolute inset-0">
      <img
        v-for="(slide, i) in heroSlides"
        :key="slide.src"
        :src="slide.src"
        :alt="slide.alt"
        :fetchpriority="i === 0 ? 'high' : 'auto'"
        :loading="i === 0 ? 'eager' : 'lazy'"
        class="hero-bg absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out"
        :class="i === activeSlide ? 'opacity-100' : 'opacity-0'"
      />
    </div>

    <!-- Scrim. Two layers: a left-to-right wash that keeps the copy column
         readable on desktop, and a bottom-up vignette that does the same job
         once the layout stacks on a phone. -->
    <div class="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/78 to-ink-900/40"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-ink-900/50"></div>

    <div class="relative w-full max-w-6xl mx-auto px-5 sm:px-6 pt-24 pb-20">
      <div class="max-w-2xl">
        <span class="hero-badge inline-flex items-center gap-2.5 text-sm font-medium tracking-[0.14em] uppercase text-white/80">
          <span class="relative flex w-2 h-2">
            <span class="absolute inline-flex w-full h-full bg-coral-400 opacity-70 animate-ping"></span>
            <span class="relative inline-flex w-2 h-2 bg-coral-400"></span>
          </span>
          Admissions open · Playgroup to UKG
        </span>

        <p class="hero-script script-label script-label-light mt-6">Welcome to Karyonz</p>
        <h1
          v-text-animate.now="0.45"
          class="hero-title display-heading text-white text-[2.6rem] sm:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight mt-1 drop-shadow-sm"
        >
          The best play school<br class="hidden sm:block" />
          for your child
        </h1>
        <p class="hero-subtitle mt-6 text-white/85 text-base sm:text-xl max-w-xl leading-relaxed">
          {{ school.subtitle }}
        </p>

        <!-- One button. Calling is a plain link, so the button always means
             "this is the thing to do". -->
        <div class="hero-ctas mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ActionButton href="#contact" class="btn-shine-auto">Register Today</ActionButton>
          <a
            :href="school.phoneHref"
            class="inline-flex items-center gap-2 text-white font-medium border-b border-white/40 hover:border-white pb-0.5 transition-colors"
          >
            <svg class="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            {{ school.phone }}
          </a>
        </div>

        <ul class="hero-trust mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/75">
          <li class="inline-flex items-center gap-1.5 text-white font-semibold">
            <svg class="w-4 h-4 text-sun-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 5.88 6.49.95-4.7 4.58 1.11 6.46L12 17.33l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.95L12 2.5z" />
            </svg>
            {{ school.rating.value }}/5
          </li>
          <li v-for="point in trustPoints" :key="point" class="inline-flex items-center gap-2">
            <span class="w-1 h-1 bg-white/40" aria-hidden="true"></span>
            {{ point }}
          </li>
        </ul>
      </div>
    </div>

    <!-- slide dots + scroll cue, pinned to the bottom of the screen -->
    <div class="hero-controls absolute inset-x-0 bottom-6 sm:bottom-8">
      <div class="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between gap-4">
        <!-- Dots keep their small look but sit inside a 44px-tall touch target. -->
        <div class="flex items-center -ml-2">
          <button
            v-for="(slide, i) in heroSlides"
            :key="slide.src"
            :aria-label="`Show background photo ${i + 1}`"
            :aria-current="i === activeSlide"
            class="grid place-items-center h-11 px-2"
            @click="selectSlide(i)"
          >
            <span
              class="block h-1.5 transition-all"
              :class="i === activeSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'"
            ></span>
          </button>
        </div>

        <a
          href="#about"
          class="hidden sm:inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-medium tracking-[0.18em] uppercase transition-colors"
        >
          Scroll
          <svg class="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
