import tailwind from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-oxc'
import { defineConfig } from 'vite'
import tsconfig from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwind(), react(), tsconfig()]
})
