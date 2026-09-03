<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue'
import { gsap } from 'gsap'
import { gallery } from '../data/school.js'

// Tracks which images actually failed to load, so we can show a graceful
// placeholder instead of a broken image icon.
const failed = reactive({})
function onError(src) {
  failed[src] = true
}

const gradients = [
  'from-sky-300 to-sky-100',
  'from-sunny-300 to-sunny-100',
  'from-ink-400 to-sky-200',
  'from-sunny-400 to-sky-200',
]

// The marquee only runs from `sm` up. On phones the strip is a plain
// swipeable carousel instead: a GSAP transform there fights the user's own
// scrolling, and there's no hover to pause it with.
const animated = ref(false)

// Only duplicate the list when it actually loops — the copy exists so the
// track can wrap seamlessly at the halfway point.
const slides = computed(() => (animated.value ? [...gallery, ...gallery] : gallery))

const trackRef = ref(null)
let tween = null

onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const wideEnough = window.matchMedia('(min-width: 40rem)').matches
  if (reducedMotion || !wideEnough) return

  animated.value = true
  nextTick(() => {
    tween = gsap.to(trackRef.value, {
      xPercent: -50,
      duration: gallery.length * 4,
      ease: 'none',
      repeat: -1,
    })
  })
})

onUnmounted(() => tween?.kill())

function pause() {
  tween?.pause()
}
function resume() {
  tween?.play()
}
</script>

<template>
  <section id="gallery" class="py-20 scroll-mt-20 overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Gallery</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">Our activities</h2>
        <p class="mt-4 text-ink-400">
          Real moments from our classrooms, activities, and celebrations at Karyonz.
        </p>
      </div>
    </div>

    <div
      class="gallery-fade mt-12 overflow-x-auto sm:overflow-visible [scrollbar-width:none] snap-x snap-mandatory sm:snap-none"
      @mouseenter="pause"
      @mouseleave="resume"
    >
      <div ref="trackRef" class="flex w-max gap-5 px-4 sm:px-6">
        <figure
          v-for="(img, i) in slides"
          :key="`${img.src}-${i}`"
          class="relative w-72 sm:w-80 aspect-4/3 shrink-0 snap-center rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow group"
        >
          <img
            v-if="!failed[img.src]"
            :src="img.src"
            :alt="img.alt"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
            @error="onError(img.src)"
          />
          <div
            v-else
            :class="['w-full h-full grid place-items-center bg-gradient-to-br text-center p-4', gradients[i % gradients.length]]"
          >
            <div>
              <div class="text-3xl mb-2">🖼️</div>
              <p class="font-heading font-semibold text-ink-800 text-sm">{{ img.label }}</p>
            </div>
          </div>
          <figcaption
            class="absolute inset-x-0 bottom-0 bg-ink-900/70 text-white text-xs font-bold uppercase tracking-wide px-3 py-3 text-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
          >
            {{ img.label }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery-fade {
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
}
</style>
