// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: process.env.GITHUB_PAGES === 'true' ? '/Diploma-Dost/' : '/',
}))