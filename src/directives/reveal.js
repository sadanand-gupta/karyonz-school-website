import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// v-reveal: fades/slides an element in the first time it scrolls into view.
// Usage: v-reveal (no stagger) or v-reveal="index" (staggers by index * 80ms).
export const vReveal = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const delay = typeof binding.value === 'number' ? binding.value * 0.08 : 0

    gsap.set(el, { opacity: 0, y: 28 })
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    })
  },
  unmounted(el) {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill()
    })
  },
}
