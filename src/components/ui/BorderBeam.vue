<script setup>
// Magic UI's BorderBeam, ported to Vue.
//
// A small bright dot travels the element's border. Magic UI does this with an
// `offset-path` on the border box, which is the only way to follow a rectangle's
// perimeter exactly — a rotating conic gradient cuts corners on non-square boxes.
//
// The host element must be `relative`; this paints an inset overlay inside it.
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 64 },      // length of the lit segment, px
  duration: { type: Number, default: 6 },   // seconds for one lap
  delay: { type: Number, default: 0 },
  from: { type: String, default: 'var(--color-coral-400)' },
  to: { type: String, default: 'var(--color-sun-300)' },
  reverse: { type: Boolean, default: false },
})

const style = computed(() => ({
  '--beam-size': `${props.size}px`,
  '--beam-duration': `${props.duration}s`,
  '--beam-delay': `${props.delay}s`,
  '--beam-from': props.from,
  '--beam-to': props.to,
  '--beam-direction': props.reverse ? 'reverse' : 'normal',
}))
</script>

<template>
  <div class="border-beam" :style="style" aria-hidden="true">
    <div class="border-beam__dot"></div>
  </div>
</template>

<style scoped>
.border-beam {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* The border itself is transparent — only the travelling dot is drawn — but it
     has to exist, because `offset-path: border-box` follows the border edge. */
  border: 1px solid transparent;
}

.border-beam__dot {
  position: absolute;
  aspect-ratio: 1;
  width: var(--beam-size);
  background: linear-gradient(to left, var(--beam-from), var(--beam-to), transparent);
  offset-path: border-box;
  offset-anchor: 0% 50%;
  animation: border-beam-run var(--beam-duration) linear infinite;
  animation-delay: var(--beam-delay);
  animation-direction: var(--beam-direction);
}

@keyframes border-beam-run {
  to {
    offset-distance: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .border-beam__dot {
    animation: none;
    opacity: 0;
  }
}
</style>
