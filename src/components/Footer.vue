<script setup>
import { asset } from '../lib/asset.js'
const year = new Date().getFullYear()

// Mirrors the NavBar's link set so the footer and header stay in step.
const links = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#batches', label: 'Batches' },
  { href: '#facilities', label: 'Facilities' },
  { href: '#videos', label: 'Videos' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-surface-floor text-ink-100">
    <div
      class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(40rem 26rem at 8% -20%, rgba(212, 162, 60, 0.14), transparent 62%)"
    ></div>

    <div class="relative max-w-6xl mx-auto px-5 sm:px-6 py-7 sm:py-12">
      <!-- The NavBar's brand lockup, with the nav links on the same row. Below
           md the two stack and centre; from md up the links sit to the right. -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
        <a href="#top" class="flex items-center justify-center md:justify-start gap-2 shrink-0">
          <img
            :src="asset('assets/logo.jpg')"
            alt="Karyonz School logo"
            class="w-10 h-10 shrink-0 rounded-full object-cover ring-1 ring-white/15"
          />
          <span class="font-heading font-bold text-white text-lg leading-tight text-left">
            Karyonz
            <span class="block text-xs font-sans font-medium text-ink-300 -mt-0.5">
              Play &amp; CBSE School
            </span>
          </span>
        </a>

        <!-- All seven links on one line. They still wrap on narrow phones
             rather than overflowing. -->
        <ul
          class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2
                 text-[13px] sm:gap-x-7 sm:text-sm md:justify-end text-ink-300"
        >
          <li v-for="link in links" :key="link.href">
            <a :href="link.href" class="inline-block py-1 sm:py-0 hover:text-white">{{ link.label }}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- The WhatsApp FAB floats over this bar's right edge, so the text is inset
         past it on mobile rather than padding a dead block of space underneath. -->
    <div
      class="relative border-t border-white/10 py-4 pl-5 pr-[4.75rem] text-center text-[11px] leading-snug text-ink-400
             sm:px-6 sm:py-5 sm:text-xs"
    >
      © {{ year }} Karyonz Play &amp; CBSE School. All rights reserved.
    </div>
  </footer>
</template>
