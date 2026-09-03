<script setup>
// Three real campus photos, each framed in a different shape.
// Titles describe what the photo actually shows and map to real
// activities from the school's enrichment programme.
const items = [
  {
    shape: 'square',
    icon: '🎨',
    ring: 'border-sky-400',
    photo: '/assets/gallery_extra_1.jpg',
    title: 'Art & Craft',
    text: 'Hands-on craft sessions where children paint, plant and build — part of our Art & Craft enrichment programme.',
  },
  {
    shape: 'circle',
    icon: '🧩',
    ring: 'border-sunny-400',
    photo: '/assets/learning_moments.jpg',
    title: 'Creative Learning',
    text: 'Puzzles, shapes and guided play that build problem-solving, focus and fine motor skills.',
  },
  {
    shape: 'triangle',
    icon: '⚽',
    ring: 'bg-coral-400',
    photo: '/assets/gallery_extra_2.jpg',
    title: 'Outdoor Play',
    text: 'Open-air play and movement in our campus play area — building coordination, confidence and teamwork.',
  },
]

const tri = 'polygon(50% 0%, 100% 100%, 0% 100%)'
</script>

<template>
  <section class="relative overflow-hidden py-20">
    <!-- scattered decorations -->
    <span class="pointer-events-none hidden sm:block absolute left-[4%] top-10 text-5xl opacity-80 animate-float" aria-hidden="true">🦋</span>
    <span class="pointer-events-none hidden sm:block absolute right-[4%] top-6 text-6xl opacity-80" aria-hidden="true">🌈</span>
    <span class="pointer-events-none hidden sm:block absolute right-[3%] bottom-16 text-4xl opacity-80 animate-float" style="animation-delay: 1.5s" aria-hidden="true">🚀</span>
    <span class="pointer-events-none hidden sm:block absolute left-[3%] bottom-24 text-3xl opacity-70" aria-hidden="true">🐛</span>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="font-heading font-bold text-pink-500 tracking-wide">Sports &amp; Creative Activity</p>
        <h2 class="display-heading text-ink-800 text-3xl sm:text-4xl mt-2">Discover · Create · Grow</h2>
        <p class="mt-4 text-ink-400 leading-relaxed">
          Every day at Karyonz mixes structured learning with hands-on making and free movement — so
          children build skills without ever feeling like they're being taught.
        </p>
      </div>

      <div class="mt-16 grid sm:grid-cols-3 gap-x-6 gap-y-12 lg:gap-12">
        <div v-for="(it, i) in items" :key="it.title" v-reveal="i" class="text-center">
          <div class="text-4xl mb-3">{{ it.icon }}</div>

          <!-- rounded square frame -->
          <div
            v-if="it.shape === 'square'"
            :class="['w-full max-w-56 aspect-square mx-auto rounded-3xl border-8 overflow-hidden shadow-lg', it.ring]"
          >
            <img :src="it.photo" :alt="it.title" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <!-- circle frame -->
          <div
            v-else-if="it.shape === 'circle'"
            :class="['w-full max-w-56 aspect-square mx-auto rounded-full border-8 overflow-hidden shadow-lg', it.ring]"
          >
            <img :src="it.photo" :alt="it.title" class="w-full h-full object-cover" loading="lazy" />
          </div>

          <!-- triangle frame: coloured triangle behind, photo clipped inside -->
          <div v-else class="relative w-full max-w-64 aspect-8/7 mx-auto">
            <div :class="['absolute inset-0', it.ring]" :style="{ clipPath: tri }"></div>
            <div class="absolute inset-[9px]" :style="{ clipPath: tri }">
              <img :src="it.photo" :alt="it.title" class="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <h3 class="display-heading text-ink-800 text-xl mt-6">{{ it.title }}</h3>
          <p class="text-ink-400 text-sm mt-2 leading-relaxed max-w-xs mx-auto">{{ it.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
