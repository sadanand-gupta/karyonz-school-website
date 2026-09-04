<script setup>
// Magic UI's BlurFade, ported to Vue on motion-v (the Vue build of Motion —
// the same engine Magic UI uses under React).
//
// `as` renders the real element rather than a wrapper div, so this can be
// dropped onto a grid child without breaking the grid.
import { computed } from 'vue'
import { Motion, useReducedMotion } from 'motion-v'

const props = defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 0.6 },
  offset: { type: Number, default: 16 },
  direction: { type: String, default: 'up' }, // up | down | left | right
  blur: { type: String, default: '7px' },
  once: { type: Boolean, default: true },
})

const reduced = useReducedMotion()

const from = computed(() => {
  switch (props.direction) {
    case 'down': return { y: -props.offset }
    case 'left': return { x: props.offset }
    case 'right': return { x: -props.offset }
    default: return { y: props.offset }
  }
})

const initial = computed(() =>
  reduced.value ? { opacity: 1 } : { opacity: 0, filter: `blur(${props.blur})`, ...from.value }
)
const target = computed(() =>
  reduced.value ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }
)
</script>

<template>
  <Motion
    :as="as"
    :initial="initial"
    :while-in-view="target"
    :in-view-options="{ once, margin: '-60px' }"
    :transition="{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </Motion>
</template>
