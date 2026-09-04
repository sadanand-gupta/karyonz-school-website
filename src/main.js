import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { vReveal } from './directives/reveal.js'
import { vTextAnimate } from './directives/textAnimate.js'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('text-animate', vTextAnimate)
app.mount('#app')
