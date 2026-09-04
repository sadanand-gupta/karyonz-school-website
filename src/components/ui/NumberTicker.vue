<script setup>
// Magic UI's NumberTicker on motion-v: a spring drives the value, so the count
// eases into place instead of running at a constant rate.
import { ref, watch, computed } from 'vue'
import { useInView, useSpring, useMotionValueEvent, useReducedMotion } from 'motion-v'

const props = defineProps({
  value: { type: Number, required: true },
  decimals: { type: Number, default: 0 },
  suffix: { type: String, default: '' },
  delay: { type: Number, default: 0 },
})

const el = ref(null)
const inView = useInView(el, { once: true, margin: '-40px' })
const reduced = useReducedMotion()

const spring = useSpring(0, { stiffness: 70, damping: 22, restDelta: 0.001 })
const shown = ref(0)

useMotionValueEvent(spring, 'change', (v) => {
  shown.value = v
})

watch(inView, (visible) => {
  if (!visible) return
  if (reduced.value) {
    shown.value = props.value
    return
  }
  setTimeout(() => spring.set(props.value), props.delay * 1000)
})

const display = computed(() => shown.value.toFixed(props.decimals))
</script>

<template>
  <span ref="el" class="tabular-nums">{{ display }}{{ suffix }}</span>
</template>
