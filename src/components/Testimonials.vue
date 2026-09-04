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
  <section id="testimonials" class="relative overflow-hidden py-16 scroll-mt-16 bg-gradient-to-b from-white to-ink-50/70">
    <div
      v-reveal
      class="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
      @mouseenter="stop"
      @mouseleave="start"
      @touchstart.passive="stop"
      @focusin="stop"
    >
      <p class="script-label">Testimonials</p>
      <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">What parents say</h2>
      <p class="mt-3 text-sm font-medium text-ink-400">
        <span class="text-sun-600">★</span>
        {{ school.rating.value }}/5 · {{ school.rating.count }} reviews on {{ school.rating.source }}
      </p>

      <div class="mt-6 relative min-h-[190px] px-0 sm:px-6 pt-8 pb-2">
        <!-- oversized quote mark sitting behind the text -->
        <span
          class="pointer-events-none absolute inset-x-0 top-0 text-[6rem] leading-none text-ink-100/80 select-none font-serif"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        <transition name="slide" mode="out-in">
          <blockquote :key="active" class="relative">
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

      <!-- Bare markers, no arrow buttons. It rotates on its own, and the
           markers keep a 44px target without drawing a box around it. -->
      <div class="mt-6 flex items-center justify-center">
        <button
          v-for="(t, i) in testimonials"
          :key="t.name"
          :aria-label="`Show testimonial ${i + 1}`"
          :aria-current="i === active"
          class="grid place-items-center h-11 px-1.5"
          @click="select(i)"
        >
          <span
            class="block h-0.5 transition-all"
            :class="i === active ? 'w-8 bg-coral-500' : 'w-4 bg-ink-200 hover:bg-ink-300'"
          ></span>
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
