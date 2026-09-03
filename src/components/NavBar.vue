<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const open = ref(false)
const scrolled = ref(false)

const links = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Batches', href: '#batches' },
  { label: 'Facilities', href: '#facilities' },
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
  scrolled.value = window.scrollY > 8
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
    class="sticky top-0 z-50 bg-white/90 backdrop-blur border-b transition-shadow duration-300"
    :class="scrolled ? 'border-ink-100 shadow-md' : 'border-transparent shadow-none'"
  >
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
      <a href="#top" class="flex items-center gap-2" @click="closeMenu">
        <img src="/assets/logo.jpg" alt="Karyonz School logo" class="w-10 h-10 rounded-full object-cover shadow-sm" />
        <span class="font-heading font-bold text-ink-700 text-lg leading-tight">
          Karyonz
          <span class="block text-xs font-sans font-medium text-ink-400 -mt-0.5">Play &amp; CBSE School</span>
        </span>
      </a>

      <ul class="hidden md:flex items-center gap-8 font-medium text-ink-700">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="hover:text-sky-400 transition-colors">{{ link.label }}</a>
        </li>
      </ul>

      <a
        href="#contact"
        class="hidden md:inline-flex items-center gap-2 rounded-full bg-sunny-400 hover:bg-sunny-500 text-white font-bold px-6 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
      >
        Enroll Now
      </a>

      <button
        class="md:hidden grid place-items-center w-11 h-11 rounded-lg text-ink-700 hover:bg-ink-50"
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
      <div v-if="open" class="md:hidden border-t border-ink-100 bg-white px-4 pb-4 max-h-[70svh] overflow-y-auto">
        <ul class="flex flex-col gap-1 pt-2 font-medium text-ink-700">
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" class="block py-2.5" @click="closeMenu">{{ link.label }}</a>
          </li>
          <li class="pt-2">
            <a
              href="#contact"
              class="inline-flex w-full justify-center items-center gap-2 rounded-full bg-sunny-400 text-ink-900 font-semibold px-5 py-2.5"
              @click="closeMenu"
            >
              Enroll Now
            </a>
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
