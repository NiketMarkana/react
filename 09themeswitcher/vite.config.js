import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // vite.config.js → only for Vite settings (plugins, aliases, dev server options, etc.)
  //darkMode : "class",
  plugins: [
    tailwindcss(),
  ],
})