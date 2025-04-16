# Aidomx

[![npm version](https://img.shields.io/npm/v/aidomx?color=blue&label=npm)](https://www.npmjs.com/package/aidomx)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/status-active-brightgreen)](#)

**Lightweight, reactive, DOM-first UI library for the web**

Aidomx adalah pustaka inti (library) yang menyediakan API ringan dan reaktif untuk memanipulasi DOM secara deklaratif. Dirancang agar fleksibel dan dapat diintegrasikan dalam berbagai environment seperti Vite, React, atau sistem build khusus lainnya.

---

## Fitur Utama

- **Deklaratif** — Gunakan atribut seperti `v-ai` untuk menghubungkan DOM dengan behavior dinamis.
- **Ringan & Cepat** — Tanpa dependensi besar, cocok untuk proyek kecil maupun berskala besar.
- **Fleksibel** — Dapat digunakan di berbagai lingkungan: HTML murni, framework modern, atau CLI.
- **Terintegrasi** — Didukung oleh pustaka turunan untuk React, CLI, dan Server.

---

## Instalasi

```bash
npm install aidomx
```

---

## Penggunaan Dasar

```html
<!-- HTML -->
<div v-ai="hello">Hello, World!</div>
```

> Untuk environment React atau Vite, gunakan paket pendukung seperti `@aidomx/react` atau `@aidomx/vite`.

---

## Integrasi & Ekosistem

Berikut adalah daftar paket turunan dalam ekosistem Aidomx beserta status dukungannya:

| Package             | Status      | Keterangan                                   |
|---------------------|-------------|----------------------------------------------|
| `@aidomx/cli`       | ✅ Selesai  | CLI utilitas untuk pengembangan & setup awal |
| `@aidomx/server`    | ✅ Selesai  | Server ringan untuk pengembangan lokal       |
| `@aidomx/react`     | ✅ Selesai  | Provider React untuk integrasi kontekstual   |
| `@aidomx/vite`      | ❌ Belum    | Plugin Vite untuk optimalisasi runtime       |
| `@aidomx/vanilla`   | ❌ Belum    | Implementasi murni untuk HTML/JS langsung    |

---

## Dokumentasi

Dokumentasi lengkap tersedia di:
[https://github.com/aidomx/aidomx](https://github.com/aidomx/aidomx)

---

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx)

> "DOM tidak perlu rumit. Aidomx membawa kesederhanaan dan kontrol kembali ke tangan developer."


