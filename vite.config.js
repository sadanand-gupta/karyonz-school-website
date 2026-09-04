import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // GitHub Pages serves a project site under /<repo-name>/, so every asset URL
  // has to be prefixed with it. Change to '/' if this ever moves to a custom
  // domain or to a host that serves from the root (Netlify, Vercel).
  base: '/karyonz-school-website/',
})
