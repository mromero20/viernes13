import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteMetadata } from './scripts/site-metadata.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const tags = siteMetadata(env.SITE_URL || env.URL)
  return {
    plugins: [react(), tailwindcss(), {
      name: 'absolute-social-metadata',
      transformIndexHtml: () => tags,
    }],
  }
})
