<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { testimonials, school } from '../data/school.js'

const active = ref(0)
let timer = null

function start() {
  clearInterval(timer)
  timer = setInterval(next, 6000)
}
function stop() {
  clearInterval(timer)
  timer = null
}

function go(i) {
  active.value = (i + testimonials.length) % testimonials.length
}
function next() {
  go(active.value + 1)
}

// Manual navigation resets the clock so a quote isn't swapped away
// immediately after someone taps to it.
function select(i) {
  go(i)
  if (timer) start()
}

onMounted(start)
onUnmounted(stop)
</script>

<template>
  <section id="testimonials" class="relative overflow-hidden py-24 scroll-mt-20">
    <div
      v-reveal
      class="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
      @mouseenter="stop"
      @mouseleave="start"
      @touchstart.passive="stop"
      @focusin="stop"
    >
      <p class="script-label">Testimonials</p>
      <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">What parents say</h2>
      <p class="mt-4 inline-flex items-center gap-1.5 rounded-full bg-sunny-100 text-sunny-500 text-sm font-bold px-4 py-1.5">
        ⭐ {{ school.rating.value }}/5 · {{ school.rating.count }} reviews on {{ school.rating.source }}
      </p>

      <!-- floating decorative rings -->
      <span class="deco-ring -z-10 w-24 h-24 border-8 border-sunny-400 -right-16 top-0 hidden lg:block"></span>
      <span class="deco-ring -z-10 w-16 h-16 border-[7px] border-sky-400 -left-24 top-44 hidden lg:block"></span>
      <span class="deco-ring -z-10 w-9 h-9 border-4 border-pink-400 -right-10 bottom-20 hidden lg:block"></span>
      <span class="deco-ring -z-10 w-7 h-7 border-4 border-coral-400 -left-12 bottom-10 hidden lg:block"></span>
      <span class="deco-ring -z-10 w-4 h-4 bg-lime-400 border-0 -left-6 top-16 hidden lg:block"></span>

      <div class="mt-12 relative min-h-[240px] sm:min-h-[200px]">
        <!-- oversized quote mark sitting behind the text -->
        <span
          class="pointer-events-none absolute inset-x-0 -top-6 text-[6rem] leading-none text-ink-100/80 select-none font-serif -z-10"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <transition name="slide" mode="out-in">
          <blockquote :key="active" class="relative px-2">
            <p class="text-ink-600 text-lg sm:text-xl leading-relaxed">
              “{{ testimonials[active].quote }}”
            </p>
            <footer class="mt-7">
              <p class="display-heading text-ink-800">{{ testimonials[active].name }}</p>
              <p class="text-ink-400 text-sm mt-0.5">
                {{ testimonials[active].role || 'Parent' }}
              </p>
            </footer>
          </blockquote>
        </transition>
      </div>

      <div class="mt-8 flex items-center justify-center gap-1">
        <button
          aria-label="Previous testimonial"
          class="w-11 h-11 grid place-items-center rounded-full bg-white shadow-md text-ink-700 hover:bg-sunny-400 hover:text-white transition-colors"
          @click="select(active - 1)"
        >
          ‹
        </button>
        <!-- Dots keep their small look but sit inside a 44px-tall target. -->
        <button
          v-for="(t, i) in testimonials"
          :key="t.name"
          :aria-label="`Show testimonial ${i + 1}`"
          :aria-current="i === active"
          class="grid place-items-center h-11 px-2"
          @click="select(i)"
        >
          <span
            class="block w-2.5 h-2.5 rounded-full transition-colors"
            :class="i === active ? 'bg-sunny-400' : 'bg-ink-200'"
          ></span>
        </button>
        <button
          aria-label="Next testimonial"
          class="w-11 h-11 grid place-items-center rounded-full bg-white shadow-md text-ink-700 hover:bg-sunny-400 hover:text-white transition-colors"
          @click="select(active + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
