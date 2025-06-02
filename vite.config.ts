import react from '@vitejs/plugin-react-swc'
// import million from 'million/compiler'
import { defineConfig } from 'vite'
import tailwind from '@tailwindcss/vite'
import tsconfig from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwind(), react(), tsconfig()]
})
