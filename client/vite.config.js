import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),jsconfigPaths()],
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:5000',
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@mui/material', '@mui/icons-material'],
        }
      }
    }
  },
  base: '/',
  optimizeDeps: {
    include: ['react', 'react-dom', 'axios']
  }
})
