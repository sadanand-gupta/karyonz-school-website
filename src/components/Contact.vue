<script setup>
import { reactive, ref } from 'vue'
import { school, programs } from '../data/school.js'

const form = reactive({ name: '', childAge: '', phone: '', batch: '', message: '' })
const showModal = ref(false)

// No backend is wired up yet, so submitting also opens the parent's email
// client with the enquiry pre-filled. Swap this for a real form service
// (e.g. Formspree, EmailJS) once you're ready to receive submissions directly.
function handleSubmit() {
  const body = encodeURIComponent(
    `Parent Name: ${form.name}\nChild Age: ${form.childAge}\nPhone: ${form.phone}\nBatch: ${form.batch}\n\nMessage:\n${form.message}`
  )
  window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(
    'Admission Enquiry - Karyonz School'
  )}&body=${body}`

  showModal.value = true
  Object.assign(form, { name: '', childAge: '', phone: '', batch: '', message: '' })
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <section id="contact" class="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
    <div class="grid lg:grid-cols-2 gap-10 items-start">
      <div v-reveal>
        <p class="script-label">Admission Desk</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">
          Let's talk about your child's first school
        </h2>
        <p class="mt-4 text-ink-600 max-w-lg">
          Reach out to schedule a campus visit or ask about admissions — we're happy to help.
        </p>

        <ul class="mt-8 space-y-5">
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-sunny-100 text-xl">📍</span>
            <div>
              <p class="font-semibold text-ink-800">Address</p>
              <p class="text-ink-600 text-sm">{{ school.address }}</p>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-sky-100 text-xl">📞</span>
            <div>
              <p class="font-semibold text-ink-800">Phone</p>
              <a :href="school.phoneHref" class="text-ink-600 text-sm hover:text-sky-400">{{ school.phone }}</a>
              <span class="text-ink-300 text-sm"> / </span>
              <a :href="school.phoneAltHref" class="text-ink-600 text-sm hover:text-sky-400">{{ school.phoneAlt }}</a>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-sunny-100 text-xl">✉️</span>
            <div>
              <p class="font-semibold text-ink-800">Email</p>
              <a :href="`mailto:${school.email}`" class="text-ink-600 text-sm hover:text-sky-400">{{ school.email }}</a>
            </div>
          </li>
          <li class="flex items-start gap-4">
            <span class="w-11 h-11 shrink-0 grid place-items-center rounded-xl bg-sky-100 text-xl">🕐</span>
            <div>
              <p class="font-semibold text-ink-800">Hours</p>
              <p class="text-ink-600 text-sm">{{ school.hours }}</p>
            </div>
          </li>
        </ul>

        <div class="mt-8 rounded-2xl overflow-hidden border border-ink-100 shadow-sm h-56">
          <iframe
            title="Karyonz School location map"
            class="w-full h-full"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps?q=${encodeURIComponent(school.address)}&output=embed`"
          ></iframe>
        </div>
      </div>

      <form
        v-reveal="1"
        class="bg-ink-50 border border-ink-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-shadow"
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
                class="w-full rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
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
                class="w-full rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
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
              class="w-full rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label for="batch" class="block text-sm font-semibold text-ink-800 mb-1.5">Selected Batch</label>
            <select
              id="batch"
              v-model="form.batch"
              required
              class="w-full rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-ink-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
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
              class="w-full rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-ink-800 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full rounded-full bg-sunny-400 hover:bg-sunny-500 text-white font-bold px-6 py-4 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Send Enquiry
          </button>
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
        <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center">
          <div class="w-16 h-16 mx-auto rounded-full bg-sunny-100 grid place-items-center text-4xl">🎉</div>
          <h3 class="font-heading font-bold text-ink-800 text-xl mt-4">Thank you!</h3>
          <p class="text-ink-600 text-sm mt-2">We will contact you shortly.</p>
          <button
            class="mt-6 w-full rounded-full bg-ink-700 hover:bg-ink-800 text-white font-semibold px-6 py-2.5 transition-colors"
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
