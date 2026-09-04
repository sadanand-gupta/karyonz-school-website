<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const barRef = ref(null)

onMounted(() => {
  gsap.set(barRef.value, { scaleX: 0, transformOrigin: 'left center' })
  gsap.to(barRef.value, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  })
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent">
    <div ref="barRef" class="h-full bg-gradient-to-r from-sun-400 to-aqua-600"></div>
  </div>
</template>
