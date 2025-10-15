import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
      "@components": resolve(__dirname, 'src/components'),
      "@pages": resolve(__dirname, 'src/pages'),
      "@assets": resolve(__dirname, 'src/assets'),
      "@styles": resolve(__dirname, 'src/styles')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/image': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
