import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 部署时改为 '/qiuzhi-xiaodui/'，本地预览用 '/'
  base: '/qiuzhixiaodui/',
  server: {
    port: 3000,
  },
})
