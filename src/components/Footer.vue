<script setup>
import { school } from '../data/school.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-ink-900 text-ink-100">
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(40rem 26rem at 8% -20%, rgba(212, 162, 60, 0.14), transparent 62%)"
    ></div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8">
      <div>
        <div class="flex items-center gap-2">
          <img src="/assets/logo.jpg" alt="Karyonz School logo" class="w-9 h-9 object-cover" />
          <span class="font-heading font-bold text-white text-lg">Karyonz</span>
        </div>
        <p class="text-sm mt-3 text-ink-300">{{ school.tagline }}</p>
        <a
          :href="school.facebook"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 mt-4 text-sm font-medium text-aqua-300 hover:text-aqua-200"
        >
          Follow us on Facebook →
        </a>
      </div>

      <div>
        <p class="font-heading font-semibold text-white">Quick Links</p>
        <ul class="mt-3 space-y-2 text-sm text-ink-300">
          <li><a href="#about" class="hover:text-white">About</a></li>
          <li><a href="#batches" class="hover:text-white">Programs</a></li>
          <li><a href="#gallery" class="hover:text-white">Gallery</a></li>
          <li><a href="#contact" class="hover:text-white">Contact</a></li>
        </ul>
      </div>

      <div>
        <p class="font-heading font-semibold text-white">Contact</p>
        <ul class="mt-3 space-y-2 text-sm text-ink-300">
          <li>{{ school.address }}</li>
          <li><a :href="school.phoneHref" class="hover:text-white">{{ school.phone }}</a> / <a :href="school.phoneAltHref" class="hover:text-white">{{ school.phoneAlt }}</a></li>
          <li><a :href="`mailto:${school.email}`" class="hover:text-white">{{ school.email }}</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-white/10 py-5 text-center text-xs text-ink-400">
      © {{ year }} Karyonz Play &amp; CBSE School. All rights reserved.
    </div>
  </footer>
</template>
