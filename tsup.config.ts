import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'esnext',
  outDir: 'dist',
  splitting: false,
  minify: true,
  sourcemap: true,
  dts: true,
  clean: true,
  shims: true,
})
