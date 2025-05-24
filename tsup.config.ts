import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'node18',
  outDir: 'dist',
  splitting: false,
  minify: true,
  sourcemap: true,
  dts: true,
  clean: true,
  shims: true,
  external: [],
  banner: {
    js: '#!/usr/bin/env node',
  },
})
