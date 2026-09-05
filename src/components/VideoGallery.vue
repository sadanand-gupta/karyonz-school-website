<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { videos } from '../data/school.js'
import BlurFade from './ui/BlurFade.vue'
import ShineBorder from './ui/ShineBorder.vue'

// Facebook's video plugin is an iframe that renders at a FIXED pixel width — it
// does not scale to its container. So a tile that wants to play measures its own
// width first and passes those real pixels to the plugin, which is why every
// tile carries a ref and why we re-measure on resize.
//
// Nothing is fetched until a visitor clicks a tile: nineteen eager embeds would
// cost the page hundreds of KB and a pile of Facebook cookies on first paint.
const playing = ref(null)

// A phone column is one tile wide, so three stacked posters push everything
// below the fold — mobile leads with a single video and offers the rest.
// Desktop fits the whole row, so it opens with all three.
//
// The one mobile leads with is picked by index rather than taken off the front:
// the middle clip is the strongest opener. Expanding still shows all three in
// their authored order.
const MOBILE_FEATURED = 1

// `md` is where the grid goes from two columns to three — see the columns-*
// classes on the tile list.
const isDesktop = ref(true)
let mq

const showAll = ref(false)
const visible = computed(() => {
  if (showAll.value || isDesktop.value) return videos
  const featured = videos[MOBILE_FEATURED] ?? videos[0]
  return featured ? [featured] : []
})
const hidden = computed(() => videos.length - visible.value.length)

// Each shape's aspect class and its height multiplier, kept together so a tile
// and the iframe inside it can never disagree about the box they want.
const SHAPES = {
  tall: { cls: 'aspect-[9/16]', ratio: 16 / 9 },
  wide: { cls: 'aspect-video', ratio: 9 / 16 },
  square: { cls: 'aspect-square', ratio: 1 },
}

// Measured pixel box for the tile that is currently playing.
const frame = reactive({ w: 0, h: 0 })
const tiles = ref({})

function measure(v) {
  const el = tiles.value[v.id]
  if (!el) return
  const w = Math.round(el.getBoundingClientRect().width)
  frame.w = w
  frame.h = Math.round(w * SHAPES[v.shape].ratio)
}

async function play(v) {
  playing.value = v
  await nextTick()
  measure(v)
}

function stop() {
  playing.value = null
}

// A tile's width changes with the column count, so the running embed has to be
// re-sized rather than left at its old pixel box.
let resizeTimer
function onResize() {
  if (!playing.value) return
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => measure(playing.value), 150)
}

function onKey(e) {
  if (e.key === 'Escape') stop()
}

function onBreakpoint(e) {
  isDesktop.value = e.matches
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 48rem)')
  isDesktop.value = mq.matches
  mq.addEventListener('change', onBreakpoint)
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  mq?.removeEventListener('change', onBreakpoint)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKey)
  clearTimeout(resizeTimer)
})

const embedSrc = computed(() => {
  if (!playing.value || !frame.w) return ''
  // `height` matters: with only `width`, the plugin renders a portrait reel
  // letterboxed into a short landscape box. Passing both makes it fill.
  const params = new URLSearchParams({
    href: playing.value.url,
    show_text: 'false',
    // Load paused on the first frame. Autoplaying inside a grid of tiles means
    // sound firing at a visitor who only clicked to see what the clip was.
    autoplay: 'false',
    width: String(frame.w),
    height: String(frame.h),
  })
  return `https://www.facebook.com/plugins/video.php?${params}`
})
</script>

<template>
  <section id="videos" class="py-16 scroll-mt-16 bg-surface-alt">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div v-reveal class="text-center max-w-2xl mx-auto">
        <p class="script-label">Straight from the classroom</p>
        <h2 v-text-animate class="display-heading text-ink-800 text-3xl sm:text-4xl mt-1">
          Our kids&rsquo; videos
        </h2>
        <p class="mt-4 text-ink-400">
          Real moments from our reels and page videos — celebrations, activities and everyday play.
        </p>
      </div>

      <!-- Multi-column packs the mixed portrait/landscape tiles without the
           ragged gaps a fixed grid would leave. -->
      <div class="mt-10 columns-1 sm:columns-2 md:columns-3 gap-4">
        <BlurFade
          v-for="(v, i) in visible"
          :key="v.id"
          :delay="i * 0.05"
          class="mb-4 break-inside-avoid"
        >
          <!-- The outline is a real frame, not a border on the poster: a padded
               shell holds the ring, and the media box sits inside it. So the
               ring has its own track and never crops the thumbnail. -->
          <div
            class="tile-frame group relative p-[3px] bg-ink-100 transition-[transform,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:bg-transparent hover:shadow-[0_18px_40px_-18px] hover:shadow-ink-900/45"
          >
            <!-- A still blue gradient ring, faded in on hover. No motion. -->
            <ShineBorder
              :width="3"
              :static="true"
              :colors="['var(--color-sky-300)', 'var(--color-sky-400)', 'var(--color-sky-500)']"
              class="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <!-- Corner ticks. The site is square-cornered throughout, so the
                 frame is marked at the corners rather than rounded. -->
            <span class="tile-tick tile-tick--tl"></span>
            <span class="tile-tick tile-tick--tr"></span>
            <span class="tile-tick tile-tick--bl"></span>
            <span class="tile-tick tile-tick--br"></span>

            <div
              :ref="el => (tiles[v.id] = el)"
              class="relative w-full bg-ink-800 overflow-hidden"
              :class="SHAPES[v.shape].cls"
            >
              <!-- Playing: the embed sits in the tile itself, at the tile's size. -->
              <template v-if="playing && playing.id === v.id">
                <iframe
                  v-if="frame.w"
                  :src="embedSrc"
                  :width="frame.w"
                  :height="frame.h"
                  :style="{ width: frame.w + 'px', height: frame.h + 'px', border: 'none', overflow: 'hidden' }"
                  class="absolute inset-0"
                  scrolling="no"
                  frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Karyonz School video"
                ></iframe>
                <button
                  type="button"
                  class="absolute top-2 right-2 z-10 grid place-items-center w-9 h-9 bg-ink-900/70 text-white/80 hover:text-white hover:bg-ink-900 transition-colors"
                  aria-label="Stop video"
                  @click="stop"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </template>

              <!-- Idle: Facebook's own poster frame, served locally so the tile
                   costs one image and no third-party request. -->
              <button
                v-else
                type="button"
                class="absolute inset-0 w-full h-full overflow-hidden focus:outline-none"
                :aria-label="`Play video ${i + 1}`"
                @click="play(v)"
              >
                <img
                  :src="v.poster"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <!-- These thumbnails are busy — bright posters, text, faces. A
                     translucent button disappears into them, so the mark is solid
                     blue with a soft dark wash behind it for separation. -->
                <span
                  class="absolute inset-0 bg-ink-900/25 group-hover:bg-ink-900/10 transition-colors duration-300"
                ></span>
                <!-- A sheen wipes across the poster once on hover. -->
                <span class="tile-sheen"></span>
                <span class="absolute inset-0 grid place-items-center">
                  <span
                    class="relative grid place-items-center w-14 h-14 rounded-full bg-sky-500 shadow-lg shadow-ink-900/30 ring-2 ring-white/90 transition duration-300 group-hover:bg-sky-600 group-hover:scale-110"
                  >
                    <!-- One ring pulses out of the mark on hover, so the tile
                         reads as playable before the pointer reaches it. -->
                    <span class="tile-pulse"></span>
                    <svg class="relative w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </BlurFade>
      </div>

      <div v-if="!showAll && hidden > 0" class="mt-8 text-center">
        <button
          type="button"
          class="text-ink-800 font-semibold border-b-2 border-ink-300 hover:border-coral-500 pb-1 transition-colors"
          @click="showAll = true"
        >
          See {{ hidden }} more {{ hidden === 1 ? 'video' : 'videos' }}
        </button>
      </div>

      <p class="mt-6 text-center text-xs text-ink-400">
        Videos play from Facebook. Opening one loads Facebook&rsquo;s player and its cookies,
        then waits on its play button.
      </p>
    </div>
  </section>
</template>

<style scoped>
/* ---- Tile frame -------------------------------------------------------------
   The frame is drawn in three layers that each answer a different moment: a
   static hairline at rest, corner ticks that grow on hover, and (from the ui/
   components) a shine ring plus a travelling beam once the pointer arrives. */

/* Corner ticks: two hairlines meeting at each corner of the frame. They read as
   viewfinder marks, which suits square corners better than a rounded outline. */
.tile-tick {
  position: absolute;
  width: 14px;
  height: 14px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease, width 0.35s ease, height 0.35s ease;
  z-index: 2;
}
.group:hover .tile-tick,
.group:focus-within .tile-tick {
  opacity: 1;
  width: 22px;
  height: 22px;
}

.tile-tick--tl { top: -5px; left: -5px; border-top: 2px solid var(--color-sky-500); border-left: 2px solid var(--color-sky-500); }
.tile-tick--tr { top: -5px; right: -5px; border-top: 2px solid var(--color-sky-400); border-right: 2px solid var(--color-sky-400); }
.tile-tick--bl { bottom: -5px; left: -5px; border-bottom: 2px solid var(--color-sky-400); border-left: 2px solid var(--color-sky-400); }
.tile-tick--br { bottom: -5px; right: -5px; border-bottom: 2px solid var(--color-sky-500); border-right: 2px solid var(--color-sky-500); }

/* A soft light wipes across the poster once when the pointer arrives. Kept to a
   single pass — a looping sweep over eight tiles turns the section into noise. */
.tile-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.28) 50%,
    transparent 62%
  );
  background-size: 250% 100%;
  background-position: 150% 0;
  opacity: 0;
}
.group:hover .tile-sheen {
  opacity: 1;
  animation: tile-sheen-wipe 0.9s ease-out forwards;
}

@keyframes tile-sheen-wipe {
  from { background-position: 150% 0; }
  to { background-position: -50% 0; }
}

/* A single ring expanding out of the play mark. */
.tile-pulse {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid var(--color-sky-400);
  opacity: 0;
}
.group:hover .tile-pulse,
.group:focus-within .tile-pulse {
  animation: tile-pulse-out 1.6s ease-out infinite;
}

@keyframes tile-pulse-out {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.9); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .tile-frame,
  .tile-tick,
  .tile-sheen,
  .tile-pulse {
    transition: none;
    animation: none;
  }
  .group:hover .tile-sheen { opacity: 0; }
  .group:hover .tile-pulse { opacity: 0; }
}
</style>
