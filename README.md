# Aidomx

**Lightweight, reactive, DOM-first UI engine for the web**

Aidomx adalah library inti yang menyediakan API ringan dan reaktif untuk memanipulasi DOM secara deklaratif. Dirancang agar fleksibel dan dapat diintegrasikan dalam berbagai environment seperti Vite, React, atau sistem build custom lainnya.

---

## Fitur Utama

- **Deklaratif** — Gunakan atribut seperti `v-ai` untuk menghubungkan DOM dengan behavior dinamis.
- **Ringan & Cepat** — Tanpa dependensi besar, cocok untuk proyek kecil maupun skala besar.
- **Fleksibel** — Bisa digunakan dalam framework modern (seperti React) maupun HTML murni.
- **Mudah Diintegrasikan** — Dengan `@aidomx/react` dan `@aidomx/vite` sebagai paket pendukung.

---

## Instalasi

```bash
npm install aidomx
```

---

## Penggunaan Dasar

```html
<!-- HTML -->
<!-- react via AidomxProvider -->
<div v-ai="hello">Hello, World!</div>
```
---

## Integrasi Framework

Gunakan paket tambahan sesuai kebutuhan:

- `@aidomx/react` — Integrasi dengan React melalui context provider.
- `@aidomx/vite` — Plugin Vite untuk optimalisasi build.

Contoh instalasi:

```bash
npm install @aidomx/react
```

---

## Dokumentasi

Dokumentasi lengkap tersedia di: [https://github.com/aidomx/aidomx](https://github.com/aidomx/aidomx)

---

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx)

> "DOM tidak perlu rumit. Aidomx membawa kesederhanaan dan kontrol kembali ke tangan developer."
