import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pub/pages/home/home.html'),
        about: resolve(__dirname, 'src/pub/pages/about/about.html')
      },
      output: {
        dir: 'dist', // 빌드시 산출물 경로
      }
    }
  }
})
