<script setup>
// The number lives in school.js (already in wa.me's international form) so the
// floating button and the enquiry form's WhatsApp option never drift apart.
import { school } from '../data/school.js'

const message = encodeURIComponent("Hi! I'd like to know more about admissions at Karyonz School.")
</script>

<template>
  <a
    :href="`https://wa.me/${school.whatsappDigits}?text=${message}`"
    target="_blank"
    rel="noopener"
    aria-label="Chat with us on WhatsApp"
    class="fixed bottom-5 right-5 z-40 grid place-items-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/25 hover:scale-105 transition-transform"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-7 h-7 fill-white">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.93 0-1.4.73-2.08 1-2.36.27-.28.58-.35.77-.35.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
    </svg>
  </a>
</template>
