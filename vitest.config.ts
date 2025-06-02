import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
  mergeConfig
} from 'vitest/config'
import viteConfig from './vite.config.js'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'e2e/**'],
      setupFiles: ['fake-indexeddb/auto', 'vitest-localstorage-mock'],
      coverage: {
        include: ['src/**'],
        exclude: [
          ...coverageConfigDefaults.exclude,
          'src/main.tsx',
          'src/type.ts'
        ]
      }
    }
  })
)
