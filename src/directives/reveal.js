import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Starting offsets per direction. Everything also blurs in, which is what
// gives the reveal its soft, expensive feel rather than a plain slide.
const FROM = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 36 },
  right: { x: -36 },
  scale: { y: 18, scale: 0.96 },
}

// v-reveal: blur-fades an element in the first time it scrolls into view.
//   v-reveal              -> rises from below
//   v-reveal="2"          -> same, staggered by index
//   v-reveal:left="1"     -> drifts in from the right-hand side, staggered
export const vReveal = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const from = FROM[binding.arg] || FROM.up
    const delay = typeof binding.value === 'number' ? binding.value * 0.09 : 0

    gsap.set(el, { opacity: 0, filter: 'blur(7px)', ...from })
    gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.85,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      // Drop the filter once it lands: a lingering `blur(0px)` still forces a
      // containing block and its own compositor layer for no benefit.
      onComplete: () => gsap.set(el, { clearProps: 'filter' }),
    })
  },
  unmounted(el) {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill()
    })
  },
}
