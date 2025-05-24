# Changelog

Semua perubahan besar pada proyek ini akan didokumentasikan di sini.

---

## [0.2.0] - 23 Mei 2025

### Added

- Direktori `bin/` untuk eksekusi CLI global (`#!/usr/bin/env node`)
- Direktori `docs/` sebagai tempat dokumentasi lengkap
- File `src/cli.ts` sebagai entry point CLI modular
- Direktori `src/engine/` untuk pemrosesan file `.ai` dan `.aix`
- Direktori `src/routes/` untuk pengelolaan rute aplikasi
- Direktori `src/server/` sebagai runtime server modular
- File `src/types/engine.ts` untuk mendefinisikan tipe engine baru

### Changed

- Refaktor besar `src/commands/`:
  - `init`, `devServer`, dan `index` kini lebih modular dan fleksibel
- Struktur CLI lebih dinamis, mendukung hot reload via WebSocket
- `README.md` disederhanakan dan difokuskan pada fitur inti
- Modularisasi `printServerInfo` dan `envScanner` untuk pemisahan logika

### Removed

- Penghapusan `src/schemas/index.ts` dan `registry.ts` karena digantikan oleh sistem `rules/engine` baru
- Penghapusan `STRUCTURE.md` karena sudah tidak dibutuhkan.

### Internal

- `tsconfig.json` diperbarui agar sesuai dengan output dari `tsup`
- `tsup.config.ts` kini menghasilkan build `esm` dan `cjs`, lengkap dengan `sourcemap`, `dts`, dan minimisasi ukuran

## [0.0.4] - 17 April 2025

### Changed

- Penyesuaian versi karena kesalahan publish versi `v0.0.4` yang tidak direncanakan.

---

## [0.0.3] - 17 April 2025

### Added

- Menambahkan `structure.md` sebagai dasar perencanaan proyek masa depan.

### Changed

- Memindahkan dan memisahkan file berbasis browser dari core utama.
- Fokus pengembangan diarahkan ke library `cli` dan `server` (Node.js).

---

## [0.0.2] - 16 April 2025

### Fixed

- Memperbaiki beberapa masalah akibat proses unpublish.
- Perbaikan pada struktur `package.json`.

---

## [0.0.1] - 10 April 2025

### Added

- Rilis awal `aidomx` sebagai pustaka dasar.
