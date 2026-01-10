import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // <--- INI KUNCI AGAR BISA DIAKSES DI DOCKER
    port: 5173,      // Pastikan port konsisten
    strictPort: true,
    watch: {
      usePolling: true // Opsional: Membantu hot-reload di Windows
    }
  }
})