<script setup>
import Preloader from './components/Preloader.vue'
import ScrollProgress from './components/ScrollProgress.vue'
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import About from './components/About.vue'
import Programs from './components/Programs.vue'
import Stats from './components/Stats.vue'
import Facilities from './components/Facilities.vue'
import Showcase from './components/Showcase.vue'
import Activities from './components/Activities.vue'
import Gallery from './components/Gallery.vue'
import VideoGallery from './components/VideoGallery.vue'
import Testimonials from './components/Testimonials.vue'
import Contact from './components/Contact.vue'
import Footer from './components/Footer.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
</script>

<template>
  <div class="antialiased">
    <Preloader />
    <ScrollProgress />
    <NavBar />
    <main>
      <Hero />
      <About />
      <Programs />
      <Stats />
      <Facilities />
      <Showcase />
      <Activities />
      <Gallery />
      <VideoGallery />
      <Testimonials />
      <Contact />
    </main>
    <Footer />
    <WhatsAppButton />
  </div>
</template>
