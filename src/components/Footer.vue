<script setup>
import { school } from '../data/school.js'
const year = new Date().getFullYear()
</script>

<template>
  <footer class="relative overflow-hidden bg-ink-900 text-ink-100">
    <span class="pointer-events-none absolute -top-40 -left-32 w-[30rem] h-[30rem] rounded-full border-[5rem] border-white/[0.04]"></span>
    <span class="pointer-events-none absolute -bottom-56 right-0 w-[34rem] h-[34rem] rounded-full border-[6rem] border-white/[0.03]"></span>
    <span class="pointer-events-none absolute top-16 right-1/4 w-16 h-16 rounded-full border-4 border-sunny-400/25"></span>
    <span class="pointer-events-none absolute bottom-24 left-1/3 w-8 h-8 rounded-full border-4 border-pink-400/25"></span>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 grid sm:grid-cols-3 gap-8">
      <div>
        <div class="flex items-center gap-2">
          <img src="/assets/logo.jpg" alt="Karyonz School logo" class="w-9 h-9 rounded-full object-cover" />
          <span class="font-heading font-bold text-white text-lg">Karyonz</span>
        </div>
        <p class="text-sm mt-3 text-ink-300">{{ school.tagline }}</p>
        <a
          :href="school.facebook"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 mt-4 text-sm font-medium text-sky-300 hover:text-sky-200"
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
