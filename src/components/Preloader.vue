<script setup>
import { asset } from '../lib/asset.js'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const loaderRef = ref(null)
const show = ref(true)

onMounted(() => {
  // Nothing here but an animation, so skip it entirely for anyone who has
  // asked for reduced motion rather than holding the page back.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    show.value = false
    return
  }

  document.body.style.overflow = 'hidden'

  // Minimum on-screen time, so the loader doesn't flash-and-vanish. Keep this
  // low: every millisecond here is added directly to LCP on a phone.
  const minTime = new Promise((resolve) => setTimeout(resolve, 400))
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', resolve, { once: true })
  })

  Promise.all([minTime, pageLoaded]).then(() => {
    gsap.to(loaderRef.value, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        show.value = false
        document.body.style.overflow = ''
      },
    })
  })
})
</script>

<template>
  <div v-if="show" ref="loaderRef" class="fixed inset-0 z-[100] bg-ink-800 grid place-items-center">
    <div class="text-center">
      <img
        :src="asset('assets/logo.jpg')"
        alt="Karyonz School"
        class="w-20 h-20 mx-auto rounded-full shadow-xl animate-pulse-scale"
      />
      <p class="font-heading font-bold text-white text-lg mt-4 tracking-wide">Karyonz School</p>
      <div class="mt-4 w-32 h-1 mx-auto bg-white/10 overflow-hidden">
        <div class="h-full w-1/2 bg-sun-400 animate-loader-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}
.animate-pulse-scale {
  animation: pulse-scale 1.4s ease-in-out infinite;
}

@keyframes loader-bar {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
.animate-loader-bar {
  animation: loader-bar 1s ease-in-out infinite;
}
</style>
