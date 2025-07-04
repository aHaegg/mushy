import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: '.', // project root
  plugins: [react()],
  build: {
    outDir: 'dist', // output to dist
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'), // main entry point
        notloggedin: resolve(__dirname, 'notloggedin.html'), // main entry point
        main: resolve(__dirname, 'app', 'index.html'), // main entry point
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
