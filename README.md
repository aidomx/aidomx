# Aidomx

[![npm version](https://img.shields.io/npm/v/aidomx?color=blue&label=npm)](https://www.npmjs.com/package/aidomx)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Build Status](https://github.com/aidomx/aidomx/actions/workflows/ci.yml/badge.svg)](#)

**Framework builder, powered by rules, schema, and structured CLI**

Aidomx adalah pustaka dan toolset modular untuk membangun framework backend/frontend secara _schema-based_ dengan pendekatan _rules_, _CLI_, dan _server runtime_. Fokus utamanya adalah pada pengembangan berbasis **Node.js**, namun juga tersedia dukungan browser sebagai pelengkap.

---

## Fitur Utama

- **Rules & Schema-Based** — Organisasi logic dan struktur berbasis aturan.
- **CLI & Server Runtime** — Untuk pengembangan lokal, scaffolding, dan runtime ringan.
- **Modular & Terstruktur** — Meniru pola project Android yang scalable.
- **Dual Ecosystem** — Mendukung penggunaan di Node.js maupun browser.

---

## Ekosistem Aidomx

### 1. Node.js Ecosystem (Fokus utama)

| Package          | Status     | Keterangan                                       |
| ---------------- | ---------- | ------------------------------------------------ |
| `@aidomx/cli`    | ✅ Selesai | CLI utility untuk scaffolding dan rule execution |
| `@aidomx/server` | ✅ Selesai | Server ringan untuk menjalankan rule + schema    |

> Ekosistem ini digunakan sebagai fondasi utama pengembangan framework.

---

### 2. Browser Ecosystem (Eksperimen)

| Package           | Status     | Keterangan                                       |
| ----------------- | ---------- | ------------------------------------------------ |
| `@aidomx/react`   | ✅ Selesai | Provider React untuk integrasi kontekstual       |
| `@aidomx/vite`    | ❌ Belum   | Plugin Vite untuk runtime transformasi           |
| `@aidomx/vanilla` | ❌ Belum   | Implementasi murni Aidomx untuk HTML/JS langsung |

> Ekosistem browser bersifat pelengkap dan tidak wajib untuk penggunaan CLI/Server.

---

## Struktur Project (Preview)

Struktur masa depan project akan mengikuti pola modular seperti Android:

```
my-project/
├── app/
│   ├── core/        ← logic bisnis utama, API, hooks, dsb
│   └── etc/         ← helper, plugin, constant, dsb
├── res/             ← resource styling
│   ├── default/     ← light/system style (CSS/TS)
│   ├── dark/
│   ├── bootstrap/
│   ├── tailwindcss/
│   ├── material/
│   └── index.ts     ← menentukan style/theme yang aktif
├── .env.local       ← konfigurasi runtime (WEB_SCHEMA, PORT, dsb)
├── package.json
├── tsconfig.json
```

Struktur ini memungkinkan isolasi logika, styling, dan konfigurasi secara bersih dan scalable.

---

## Instalasi

```bash
npm install @aidomx/cli --global
```

---

## Dokumentasi

Dokumentasi lengkap tersedia di:  
[https://github.com/aidomx/aidomx](https://github.com/aidomx/aidomx)

---

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx)

> "Aidomx bukan hanya framework, tapi pondasi untuk membangun ekosistem dengan kendali penuh."
