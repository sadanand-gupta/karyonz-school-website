import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // Vercel serves this at the domain root, so asset URLs must not be prefixed.
  // A sub-path base here is what produced 404s on every asset and a blank page.
  base: '/',
})
