<script setup>
import { reactive, ref } from 'vue'
import { school, programs } from '../data/school.js'
import ActionButton from './ui/ActionButton.vue'

const form = reactive({ name: '', childAge: '', phone: '', batch: '', message: '' })

// Two-step submit: the form itself never posts anywhere (no backend, and none
// needed). Submitting opens a chooser, and the parent picks the channel they
// already use — WhatsApp or their own mail client — with the enquiry they just
// typed pre-filled either way. Swap this for a real form service (e.g.
// Formspree, EmailJS) if you'd rather receive submissions directly one day.
const showChoice = ref(false)
const showThanks = ref(false)

const SUBJECT = 'Admission Enquiry - Karyonz School'

// One plain-text body shared by both channels, so an enquiry reads the same
// whichever way it arrives. Message is last because it's the only free-form
// part and may run long.
function buildMessage() {
  const lines = [
    `Parent Name: ${form.name}`,
    `Child Age: ${form.childAge}`,
    `Phone: ${form.phone}`,
    `Batch: ${form.batch}`,
  ]
  if (form.message.trim()) lines.push('', 'Message:', form.message.trim())
  return lines.join('\n')
}

function resetForm() {
  Object.assign(form, { name: '', childAge: '', phone: '', batch: '', message: '' })
}

function handleSubmit() {
  showChoice.value = true
}

function sendViaWhatsApp() {
  // Lead with the subject so the chat doesn't open on a bare list of fields.
  const text = encodeURIComponent(`${SUBJECT}\n\n${buildMessage()}`)
  window.open(`https://wa.me/${school.whatsappDigits}?text=${text}`, '_blank', 'noopener')
  finish()
}

function sendViaEmail() {
  const url = `mailto:${school.enquiryEmail}?subject=${encodeURIComponent(
    SUBJECT
  )}&body=${encodeURIComponent(buildMessage())}`
  // mailto: hands off to the OS mail client; keep the visitor on the page.
  window.location.href = url
  finish()
}

function finish() {
  showChoice.value = false
  showThanks.value = true
  resetForm()
}

function closeChoice() {
  showChoice.value = false
}

function closeThanks() {
  showThanks.value = false
}

// --- Map / directions -------------------------------------------------
// The Google embed iframe cannot ask for the visitor's location (Google
// blocks geolocation inside `output=embed`), so tapping the map hands off
// to Google Maps directions instead. We try for real GPS coordinates first;
// if the visitor denies the prompt or it times out we still open directions
// without an origin, and Google fills in "Your location" itself. Either way
// the visitor lands on a route with distance and time already drawn.
const destination = school.mapsQuery || school.address
const locating = ref(false)

function openDirections(origin) {
  const params = new URLSearchParams({
    api: '1',
    destination,
    travelmode: 'driving',
  })
  if (origin) params.set('origin', origin)
  window.open(`https://www.google.com/maps/dir/?${params}`, '_blank', 'noopener')
}

function getDirections() {
  if (locating.value) return

  if (!navigator.geolocation) {
    openDirections()
    return
  }

  locating.value = true
  let settled = false
  const go = (origin) => {
    if (settled) return
    settled = true
    locating.value = false
    openDirections(origin)
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => go(`${pos.coords.latitude},${pos.coords.longitude}`),
    () => go(),
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  )

  // Some browsers leave the permission prompt open indefinitely; don't let
  // the button sit in a loading state forever.
  setTimeout(() => go(), 9000)
}
</script>

<template>
  <section id="contact" class="bg-surface-alt px-4 sm:px-6 py-16 scroll-mt-16">
    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
      <div v-reveal>
        <p class="script-label">Admission Desk</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">
          Let's talk about your child's first school
        </h2>
        <p class="mt-4 text-ink-600 max-w-lg">
          Reach out to schedule a campus visit or ask about admissions — we're happy to help.
        </p>

        <ul class="mt-8 space-y-5">
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center bg-sun-100 text-xl">📍</span>
            <div>
              <p class="font-semibold text-ink-800">Address</p>
              <p class="text-ink-600 text-sm">{{ school.address }}</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center bg-aqua-100 text-xl">📞</span>
            <div>
              <p class="font-semibold text-ink-800">Phone</p>
              <a :href="school.phoneHref" class="text-ink-600 text-sm hover:text-aqua-600">{{ school.phone }}</a>
              <span class="text-ink-300 text-sm"> / </span>
              <a :href="school.phoneAltHref" class="text-ink-600 text-sm hover:text-aqua-600">{{ school.phoneAlt }}</a>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center bg-sun-100 text-xl">✉️</span>
            <div>
              <p class="font-semibold text-ink-800">Email</p>
              <a :href="`mailto:${school.email}`" class="text-ink-600 text-sm hover:text-aqua-600">{{ school.email }}</a>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center bg-aqua-100 text-xl">🕐</span>
            <div>
              <p class="font-semibold text-ink-800">Hours</p>
              <p class="text-ink-600 text-sm">{{ school.hours }}</p>
            </div>
          </li>
        </ul>

        <div class="mt-8 relative overflow-hidden h-56 group">
          <iframe
            title="Karyonz School location map"
            class="w-full h-full pointer-events-none"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`"
          ></iframe>

          <!-- The iframe is click-through disabled above so this covers it:
               one tap anywhere on the map starts the route from wherever
               the visitor currently is. -->
          <button
            type="button"
            :aria-label="`Get directions to ${school.name} from your current location`"
            :disabled="locating"
            class="absolute inset-0 w-full h-full flex items-end justify-center pb-4 bg-ink-900/0 hover:bg-ink-900/20 focus:outline-none focus-visible:bg-ink-900/20 transition-colors cursor-pointer"
            @click="getDirections"
          >
            <span
              class="inline-flex items-center gap-2 bg-white text-ink-800 text-sm font-semibold tracking-tight px-5 py-2.5 border border-surface-line group-hover:-translate-y-0.5 transition-transform duration-200"
            >
              <span aria-hidden="true">📍</span>
              {{ locating ? 'Finding your location…' : 'Get Directions' }}
            </span>
          </button>
        </div>
        <p class="mt-2 text-xs text-ink-500">
          Tap the map to open Google Maps with the route from your current location.
        </p>
      </div>

      <form
        v-reveal:left="1"
        class="bg-white border border-surface-line border-t-2 border-t-ink-900 p-7"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-sm font-semibold text-ink-800 mb-1.5">Parent Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Your full name"
                class="w-full border-0 border-b border-surface-line bg-transparent px-0 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-500 transition-colors"
              />
            </div>
            <div>
              <label for="childAge" class="block text-sm font-semibold text-ink-800 mb-1.5">Child Age</label>
              <input
                id="childAge"
                v-model="form.childAge"
                type="text"
                required
                placeholder="e.g. 3 years"
                class="w-full border-0 border-b border-surface-line bg-transparent px-0 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-sm font-semibold text-ink-800 mb-1.5">Phone Number</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              required
              placeholder="+91 XXXXX XXXXX"
              class="w-full border-0 border-b border-surface-line bg-transparent px-0 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-500 transition-colors"
            />
          </div>

          <div>
            <label for="batch" class="block text-sm font-semibold text-ink-800 mb-1.5">Selected Batch</label>
            <select
              id="batch"
              v-model="form.batch"
              required
              class="w-full border-0 border-b border-surface-line bg-transparent px-0 py-2.5 text-ink-800 focus:outline-none focus:border-coral-500 transition-colors"
            >
              <option value="" disabled>Choose a batch</option>
              <option v-for="p in programs" :key="p.name" :value="p.name">{{ p.name }} ({{ p.ageGroup }})</option>
            </select>
          </div>

          <div>
            <label for="message" class="block text-sm font-semibold text-ink-800 mb-1.5">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="4"
              required
              placeholder="Tell us anything else we should know..."
              class="w-full border-0 border-b border-surface-line bg-transparent px-0 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:border-coral-500 transition-colors resize-none"
            ></textarea>
          </div>

          <ActionButton type="submit" block>Send Enquiry</ActionButton>
        </div>
      </form>
    </div>

    <!-- Channel chooser: shown on submit, before anything is sent -->
    <transition name="modal">
      <div
        v-if="showChoice"
        class="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 backdrop-blur-sm px-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="choice-title"
        @click.self="closeChoice"
        @keydown.esc="closeChoice"
      >
        <div class="bg-white shadow-2xl max-w-sm w-full p-7 sm:p-8">
          <h3 id="choice-title" class="font-heading font-bold text-ink-800 text-xl text-center">
            How would you like to send it?
          </h3>
          <p class="text-ink-600 text-sm mt-2 text-center">
            Your enquiry is ready — pick a way to send it and we'll fill it in for you.
          </p>

          <div class="mt-6 space-y-3">
            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1eb355] text-white font-semibold px-6 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
              @click="sendViaWhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 fill-current shrink-0" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.93 0-1.4.73-2.08 1-2.36.27-.28.58-.35.77-.35.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.39-.24.65-.14.27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
              </svg>
              Send via WhatsApp
            </button>

            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-3 border border-ink-200 text-ink-800 hover:bg-ink-50 font-semibold px-6 py-3.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              @click="sendViaEmail"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0" aria-hidden="true">
                <rect x="2.5" y="4.5" width="19" height="15" />
                <path d="m2.5 6 9.5 7 9.5-7" />
              </svg>
              Send via Email
            </button>
          </div>

          <button
            type="button"
            class="mt-4 w-full text-ink-500 hover:text-ink-800 text-sm font-medium py-2 transition-colors"
            @click="closeChoice"
          >
            Back to form
          </button>
        </div>
      </div>
    </transition>

    <!-- Thank-you modal -->
    <transition name="modal">
      <div
        v-if="showThanks"
        class="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 backdrop-blur-sm px-4"
        @click.self="closeThanks"
      >
        <div class="bg-white shadow-2xl max-w-sm w-full p-8 text-center">
          <div class="w-16 h-16 mx-auto bg-sun-100 grid place-items-center text-4xl">🎉</div>
          <h3 class="font-heading font-bold text-ink-800 text-xl mt-4">Thank you!</h3>
          <p class="text-ink-600 text-sm mt-2">We will contact you shortly.</p>
          <button
            class="mt-6 w-full bg-ink-700 hover:bg-ink-800 text-white font-semibold px-6 py-2.5 transition-colors"
            @click="closeThanks"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
