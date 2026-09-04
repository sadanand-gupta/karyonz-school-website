<script setup>
// The site's one button. Magic UI's ShimmerButton idea — a gloss that sweeps
// across on hover — with motion-v springs for the lift and the press.
//
// Deliberately the only styled action on the page: everything else that
// navigates is a plain link, so a button always means "this is the thing to do".
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'

const props = defineProps({
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'solid' }, // solid | outline | light
  block: { type: Boolean, default: false },
})

const reduced = useReducedMotion()

const base =
  'btn-shine relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2'

const variants = {
  // Coral is the only colour a button is ever painted.
  solid: 'bg-coral-500 hover:bg-coral-600 text-white focus-visible:outline-coral-500',
  // For use on a photo: a hairline that reads against anything.
  outline: 'border border-white/40 text-white hover:bg-white/10 focus-visible:outline-white',
  light: 'border border-ink-200 text-ink-800 hover:bg-ink-50 focus-visible:outline-coral-500',
}

const classes = computed(() => [base, variants[props.variant], props.block ? 'w-full' : ''])
</script>

<template>
  <Motion
    :as="href ? 'a' : 'button'"
    :href="href || undefined"
    :type="href ? undefined : type"
    :class="classes"
    :while-hover="reduced ? {} : { y: -2 }"
    :while-press="reduced ? {} : { y: 0, scale: 0.985 }"
    :transition="{ type: 'spring', stiffness: 400, damping: 26 }"
  >
    <slot />
  </Motion>
</template>
