import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local machine CLI
      // "/api/v1": "http://localhost:3000/"
      // Docker
      "/api/v1": "http://server:3000/"
    },
    host: true
  },
  build: {
    outDir: "./dist/"
    }
})
