<script setup>
import { reactive, ref } from 'vue'
import { school, programs } from '../data/school.js'
import ActionButton from './ui/ActionButton.vue'

const form = reactive({ name: '', childAge: '', phone: '', batch: '', message: '' })
const showModal = ref(false)

// No backend is wired up yet, so submitting also opens the parent's email
// client with the enquiry pre-filled. Swap this for a real form service
// (e.g. Formspree, EmailJS) once you're ready to receive submissions directly.
function handleSubmit() {
  const body = encodeURIComponent(
    `Parent Name: ${form.name}\nChild Age: ${form.childAge}\nPhone: ${form.phone}\nBatch: ${form.batch}\n\nMessage:\n${form.message}`
  )
  window.location.href = `mailto:${school.enquiryEmail}?subject=${encodeURIComponent(
    'Admission Enquiry - Karyonz School'
  )}&body=${body}`

  showModal.value = true
  Object.assign(form, { name: '', childAge: '', phone: '', batch: '', message: '' })
}

function closeModal() {
  showModal.value = false
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

    <!-- Thank-you modal -->
    <transition name="modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 grid place-items-center bg-ink-900/60 backdrop-blur-sm px-4"
        @click.self="closeModal"
      >
        <div class="bg-white shadow-2xl max-w-sm w-full p-8 text-center">
          <div class="w-16 h-16 mx-auto bg-sun-100 grid place-items-center text-4xl">🎉</div>
          <h3 class="font-heading font-bold text-ink-800 text-xl mt-4">Thank you!</h3>
          <p class="text-ink-600 text-sm mt-2">We will contact you shortly.</p>
          <button
            class="mt-6 w-full bg-ink-700 hover:bg-ink-800 text-white font-semibold px-6 py-2.5 transition-colors"
            @click="closeModal"
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
