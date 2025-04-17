# Struktur Proyek Aidomx

Berikut adalah struktur direktori standar untuk proyek berbasis Aidomx. Struktur ini dirancang agar modular dan scalable, mengadopsi filosofi arsitektur seperti pada pengembangan Android.

## Struktur Dasar

```
my-project/
├── app/
│   ├── core/        ← logika bisnis utama, API, hooks, dsb
│   └── etc/         ← helper, plugin, constants, middleware, dsb
├── res/             ← resource styling (theme, UI kit, dsb)
│   ├── default/     ← style dasar (light/system)
│   ├── dark/        ← style gelap
│   ├── bootstrap/   ← style berbasis Bootstrap
│   ├── tailwindcss/ ← style berbasis Tailwind CSS
│   ├── material/    ← style berbasis Material Design
│   └── index.ts     ← entry untuk menentukan tema aktif
├── .env.local       ← konfigurasi runtime (PORT, WEB_SCHEMA, dll)
├── package.json
├── tsconfig.json
```

## Fokus Pengembangan

Aidomx difokuskan pada dua ekosistem utama:

### 1. Node Ecosystem

Digunakan untuk pengembangan berbasis CLI dan Server.

- `@aidomx/cli`: CLI untuk inisialisasi proyek, generate file, dll
- `@aidomx/server`: Server runtime ringan untuk pengembangan dan integrasi

### 2. Browser Ecosystem _(Terpisah dari core utama)_

Library tambahan untuk integrasi dengan browser/framework modern:

- `@aidomx/react`: Integrasi dengan React
- `@aidomx/vanilla`: Untuk penggunaan langsung di HTML/JS
- `@aidomx/vite`: Plugin Vite untuk optimalisasi runtime

> Catatan: Core `aidomx` saat ini hanya berperan sebagai fondasi internal untuk `cli` dan `server`, bukan library untuk DOM/browser langsung.

## Rencana Pengembangan Selanjutnya

- Penyederhanaan schema dan auto-routing
- Modulasi berdasarkan fitur (feature modules)
- Dukungan testing dan mocking built-in
- Integrasi i18n dan plugin linting/prettier

---

Dokumen ini akan terus diperbarui seiring dengan berkembangnya framework.
