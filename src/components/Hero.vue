<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { school } from '../data/school.js'

gsap.registerPlugin(ScrollTrigger)

const heroSlides = [
  { src: '/assets/gallery_extra_1.jpg', alt: 'Students with craft planters outside the school' },
  { src: '/assets/gallery_extra_2.jpg', alt: 'Students at the school playground' },
]
const activeSlide = ref(0)
let slideTimer = null

const heroRef = ref(null)
const swoosh = ref(null)

function startAutoplay() {
  clearInterval(slideTimer)
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, 5000)
}

// Tapping a dot should show that slide and reset the clock, so the photo
// doesn't flip away a moment after the parent picked it.
function selectSlide(i) {
  activeSlide.value = i
  if (slideTimer) startAutoplay()
}

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion) return

  startAutoplay()

  gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } })
    .from('.hero-script', { opacity: 0, y: 16 })
    .from('.hero-title', { opacity: 0, y: 24 }, '-=0.55')
    .from('.hero-subtitle', { opacity: 0, y: 20 }, '-=0.55')
    .from('.hero-ctas', { opacity: 0, y: 20 }, '-=0.55')
    .from('.hero-photo', { opacity: 0, scale: 0.94 }, '-=0.7')
    .from('.deco-ring', { opacity: 0, scale: 0.5, stagger: 0.08 }, '-=0.6')

  gsap.to(swoosh.value, {
    y: 80,
    ease: 'none',
    scrollTrigger: { trigger: heroRef.value, start: 'top top', end: 'bottom top', scrub: 1 },
  })
})

onUnmounted(() => clearInterval(slideTimer))
</script>

<template>
  <section id="top" ref="heroRef" class="relative overflow-hidden bg-white min-h-[calc(100svh-65px)] flex items-center">
    <!-- soft pink swoosh arc, drawn with a thick-bordered circle -->
    <div
      ref="swoosh"
      class="pointer-events-none absolute -top-[38rem] -left-[26rem] w-[62rem] h-[62rem] rounded-full border-[7rem] border-pink-100"
    ></div>

    <div class="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- text -->
      <div class="text-center md:text-left order-2 md:order-1">
        <p class="hero-script script-label">Welcome to Karyonz</p>
        <h1 class="hero-title display-heading text-ink-800 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] mt-1">
          The best play school<br class="hidden sm:block" />
          for your child
        </h1>
        <p class="hero-subtitle mt-5 text-ink-400 text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
          {{ school.subtitle }}
        </p>
        <div class="hero-ctas mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
          <a
            href="#contact"
            class="w-full sm:w-auto text-center rounded-full bg-sunny-400 hover:bg-sunny-500 text-white font-bold px-9 py-4 shadow-lg shadow-sunny-400/30 hover:-translate-y-0.5 transition-all"
          >
            Register Today
          </a>
          <a
            :href="school.phoneHref"
            class="w-full sm:w-auto text-center rounded-full bg-white hover:bg-ink-50 text-ink-800 font-bold px-9 py-4 border-2 border-ink-100 hover:-translate-y-0.5 transition-all"
          >
            Call Admissions Desk
          </a>
        </div>
      </div>

      <!-- blob-masked photo with floating rings -->
      <div class="hero-photo relative order-1 md:order-2">
        <div class="blob-mask relative aspect-square shadow-2xl">
          <img
            v-for="(slide, i) in heroSlides"
            :key="slide.src"
            :src="slide.src"
            :alt="slide.alt"
            :fetchpriority="i === 0 ? 'high' : 'auto'"
            :loading="i === 0 ? 'eager' : 'lazy'"
            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            :class="i === activeSlide ? 'opacity-100' : 'opacity-0'"
          />
        </div>

        <span class="deco-ring w-24 h-24 border-8 border-sky-400 -left-6 top-1/3 animate-float"></span>
        <span class="deco-ring w-32 h-32 border-[12px] border-sunny-400 left-10 -bottom-8 animate-float" style="animation-delay: 1.4s"></span>
        <span class="deco-ring w-10 h-10 border-4 border-pink-400 -left-2 bottom-16"></span>
        <span class="deco-ring w-6 h-6 border-4 border-sky-300 right-6 top-1/2"></span>
        <span class="deco-ring w-5 h-5 bg-coral-400 border-0 right-1/3 -top-2"></span>

        <!-- Dots: the visible bar stays small, but each button carries a
             44px-tall / 26px-wide touch target around it. -->
        <div class="mt-8 flex items-center justify-center">
          <button
            v-for="(slide, i) in heroSlides"
            :key="slide.src"
            :aria-label="`Show photo ${i + 1}`"
            :aria-current="i === activeSlide"
            class="grid place-items-center h-11 px-2"
            @click="selectSlide(i)"
          >
            <span
              class="block h-2.5 rounded-full transition-all"
              :class="i === activeSlide ? 'w-7 bg-sunny-400' : 'w-2.5 bg-ink-200 hover:bg-ink-300'"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
