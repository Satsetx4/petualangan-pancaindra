import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/lib/site.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'replace-site-url-in-html',
      transformIndexHtml(html) {
        return html.replaceAll('__PETUALANGAN_SITE_URL__', SITE_URL.replace(/\/$/, ''))
      },
    },
  ],
  server: {
    host: true,
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    restoreMocks: true,
  },
})
