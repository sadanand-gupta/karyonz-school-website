<script setup>
import { asset } from '../lib/asset.js'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ActionButton from './ui/ActionButton.vue'

const open = ref(false)
const scrolled = ref(false)

// The bar floats transparently over the full-screen hero photo and only takes
// on its white background once you've scrolled past it — or once the mobile
// menu is open, so the dropdown panel isn't left hanging off a clear header.
const solid = computed(() => scrolled.value || open.value)

const links = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Batches', href: '#batches' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Videos', href: '#videos' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

function closeMenu() {
  open.value = false
}

function onKeydown(e) {
  if (e.key === 'Escape') closeMenu()
}

function onScroll() {
  scrolled.value = window.scrollY > 80
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300"
    :class="solid ? 'bg-white/95 backdrop-blur border-surface-line shadow-md' : 'bg-transparent border-transparent'"
  >
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
      <a href="#top" class="flex items-center gap-2" @click="closeMenu">
        <img :src="asset('assets/logo.jpg')" alt="Karyonz School logo" class="w-10 h-10 rounded-full object-cover ring-1 ring-black/5" />
        <span class="font-heading font-bold text-lg leading-tight transition-colors" :class="solid ? 'text-ink-700' : 'text-white'">
          Karyonz
          <span
            class="block text-xs font-sans font-medium -mt-0.5 transition-colors"
            :class="solid ? 'text-ink-400' : 'text-white/75'"
          >
            Play &amp; CBSE School
          </span>
        </span>
      </a>

      <ul
        class="hidden md:flex items-center gap-8 font-medium transition-colors"
        :class="solid ? 'text-ink-700' : 'text-white'"
      >
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="transition-colors"
            :class="solid ? 'hover:text-coral-500' : 'hover:text-coral-300'"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Wrapped rather than given `hidden` directly: ActionButton's own
           `inline-flex` wins the cascade and the button would show on mobile. -->
      <div class="hidden md:block">
        <ActionButton href="#contact" class="!px-6 !py-2.5">Enroll Now</ActionButton>
      </div>

      <button
        class="md:hidden grid place-items-center w-11 h-11 transition-colors"
        :class="solid ? 'text-ink-700 hover:bg-ink-50' : 'text-white hover:bg-white/15'"
        :aria-label="open ? 'Close menu' : 'Open menu'"

        :aria-expanded="open"
        @click="open = !open"
      >
        <svg v-if="!open" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <transition name="fade">
      <div v-if="open" class="md:hidden border-t border-surface-line bg-white px-4 pb-4 max-h-[70svh] overflow-y-auto">
        <ul class="flex flex-col gap-1 pt-2 font-medium text-ink-700">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" class="block py-2.5" @click="closeMenu">{{ link.label }}</a>
          </li>
          <li class="pt-2">
            <ActionButton href="#contact" block class="!py-3" @click="closeMenu">
              Enroll Now
            </ActionButton>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
