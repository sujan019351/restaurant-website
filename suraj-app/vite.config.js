import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path configuration:
// - GitHub Pages deployment uses '/restaurant-website/'
// - Vercel, Netlify, and local development use '/'
const getBasePath = () => {
  if (process.env.VITE_BASE_PATH) return process.env.VITE_BASE_PATH;
  if (process.env.VERCEL) return '/';
  if (process.env.GITHUB_ACTIONS) return '/restaurant-website/';
  return '/';
};

// https://vite.dev/config/
export default defineConfig({
  base: getBasePath(),
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
