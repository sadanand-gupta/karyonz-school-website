<script setup>
// Magic UI's ShineBorder, ported to Vue.
//
// A gradient that sweeps around the element's edge. It is painted as a full
// rectangle and then masked down to a border-width ring with the standard
// two-layer `mask-composite: exclude` trick, so no wrapper element is needed.
//
// The host element must be `relative`.
import { computed } from 'vue'

const props = defineProps({
  width: { type: Number, default: 1 },        // ring thickness, px
  duration: { type: Number, default: 12 },    // seconds per sweep
  static: { type: Boolean, default: false },  // true = a still ring, no sweep
  colors: {
    type: Array,
    default: () => ['var(--color-coral-400)', 'var(--color-sun-300)', 'var(--color-aqua-300)'],
  },
})

const style = computed(() => ({
  '--shine-width': `${props.width}px`,
  '--shine-duration': `${props.duration}s`,
  backgroundImage: `radial-gradient(transparent, transparent, ${props.colors.join(',')}, transparent, transparent)`,
}))
</script>

<template>
  <div
    class="shine-border"
    :class="{ 'shine-border--static': static }"
    :style="style"
    aria-hidden="true"
  ></div>
</template>

<style scoped>
.shine-border {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-size: 300% 300%;
  padding: var(--shine-width);
  /* Keep only the padding ring: fill the whole box, then punch out the middle. */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: shine-sweep var(--shine-duration) linear infinite;
}

/* A still ring: the gradient is centred and simply does not move. */
.shine-border--static {
  animation: none;
  background-position: 50% 50%;
}

@keyframes shine-sweep {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

@media (prefers-reduced-motion: reduce) {
  .shine-border {
    animation: none;
  }
}
</style>
