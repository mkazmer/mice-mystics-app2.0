import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Same-origin API in dev, so the session cookie just works (no CORS)
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
