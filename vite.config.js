import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true'
const base = isGitHubPagesBuild && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['chinchin-icon.svg'],
      manifest: {
        name: 'ChinChin — Mi colección de bebidas',
        short_name: 'ChinChin',
        description: 'Tu colección personal de bebidas.',
        theme_color: '#10100f',
        background_color: '#10100f',
        lang: 'es',
        display: 'standalone',
        start_url: base,
        scope: base,
        icons: [
          { src: `${base}chinchin-icon.svg`, sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.openfoodfacts\.org\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'off-product-images', expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 } }
          },
          {
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'chinchin-fonts', expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 }, cacheableResponse: { statuses: [0, 200] } }
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/storage\/v1\/object\/public\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'chinchin-images', expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 60 } }
          }
        ]
      }
    })
  ]
})
