import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './reveal.js'

gsap.registerPlugin(ScrollTrigger)

// Wraps every word in its own inline-block span so each can be transformed,
// while leaving element children (the <br> inside a headline) untouched and
// keeping the spaces between words as real text nodes.
function splitWords(el) {
  const spans = []
  const nodes = [...el.childNodes]

  for (const node of nodes) {
    if (node.nodeType !== Node.TEXT_NODE) continue

    const words = node.textContent.split(/(\s+)/).filter((part) => part !== '')
    if (!words.length) continue

    const frag = document.createDocumentFragment()
    for (const part of words) {
      if (/^\s+$/.test(part)) {
        frag.appendChild(document.createTextNode(part))
        continue
      }
      const span = document.createElement('span')
      span.className = 'word-piece'
      span.textContent = part
      frag.appendChild(span)
      spans.push(span)
    }
    node.replaceWith(frag)
  }

  return spans
}

// v-text-animate: reveals a heading word by word, each one blurring into place.
//   v-text-animate               -> plays when it scrolls into view
//   v-text-animate.now="0.3"     -> plays straight away after a 0.3s delay
export const vTextAnimate = {
  mounted(el, binding) {
    if (prefersReducedMotion()) return

    const words = splitWords(el)
    if (!words.length) return

    const delay = typeof binding.value === 'number' ? binding.value : 0

    gsap.set(words, { opacity: 0, yPercent: 40, filter: 'blur(9px)' })
    gsap.to(words, {
      opacity: 1,
      yPercent: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      delay,
      ease: 'power3.out',
      stagger: 0.055,
      scrollTrigger: binding.modifiers.now ? undefined : { trigger: el, start: 'top 88%', once: true },
      onComplete: () => gsap.set(words, { clearProps: 'filter' }),
    })
  },
  unmounted(el) {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.trigger === el) st.kill()
    })
  },
}
