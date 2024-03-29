import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "url"; //novo
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@context', replacement: fileURLToPath(new URL('./src/js/context', import.meta.url)) },
    ],
  },
})
