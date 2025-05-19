import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@views', replacement: path.resolve(__dirname, 'src/views') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src/stores') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') }
    ]
  }
})