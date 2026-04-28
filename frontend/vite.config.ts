import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// React Compiler (babel-plugin-react-compiler) removed intentionally:
// it generates `import { c } from 'react/compiler-runtime'` which breaks
// when the module is bundled as CJS-only by Vite on this machine.
export default defineConfig({
  cacheDir: '/tmp/vft-clean-2',
  plugins: [
    react(),
  ],
})
