import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    // Serve index.html for all routes (SPA fallback)
    port: 4173,
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {},
  },
})
