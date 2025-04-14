# Aidomx VISION.md

## Visi Utama

Aidomx adalah sebuah ekosistem modular dan fleksibel yang dirancang untuk menyederhanakan proses membangun UI lintas platform (HTML, React, Vue, dsb), dengan pendekatan berbasis deklaratif dan konfiguratif yang lebih bersih, ringan, dan scalable.

### Tujuan Jangka Panjang

- Mengurangi boilerplate seperti `useState`, `useEffect`, dan `className` panjang.
- Menyediakan deklarasi UI menggunakan `v-ai` dengan konfigurasi terpisah.
- Mengembangkan `@aidomx/core` sebagai inti logic renderer.
- Menghadirkan `@aidomx/rupalang` sebagai _domain-specific language_ (DSL) untuk menulis UI rules.
- Menyediakan runtime yang bisa berjalan di berbagai lingkungan (client, server, UMD).

## Roadmap

### v0.0.5 (Stabil Awal)

- [x] `@aidomx/react` stabil dengan `v-ai` directive
- [x] `@aidomx/core` memuat rule engine dasar (event, class, state binding)
- [ ] Dokumentasi awal (README + examples)

### v1.x

- Penyempurnaan API `rules`
- Support multi framework (Vue, Svelte, Solid)
- Runtime universal (client dan server)
- Custom event lifecycle hooks (onMount, onDestroy, dsb)

### v2.x

- Plugin system di `@aidomx/core`
- Dukungan IIFE & UMD build (untuk browser biasa)
- Runtime server (`@aidomx/server`) untuk transformasi HTML statis

### v3.x (Rupalang)

- Perkenalan `@aidomx/rupalang`
- Parsing DSL `.rpl` menjadi rules object
- Kompatibel langsung dengan `@aidomx/core`
- Editor support: syntax highlighting, linting

### v4.x

- `@aidomx/cli` untuk generate project, compile DSL, dsb
- Integrasi penuh dengan `vite`, `next`, atau standalone runtime

### v5.x

- Framework penuh berbasis aidomx + Rupalang
- Router, State, API layer terintegrasi
- Dokumentasi dan ekosistem plugin resmi
- Mode "compile once run anywhere"

## Prinsip Desain

- **Sederhana dan eksplisit**: mengurangi abstraksi yang membingungkan
- **Deklaratif dan modular**: semua bisa diatur dalam satu ruleset
- **Framework agnostic**: tidak mengunci ke satu ekosistem
- **Flexible mode**: bisa run time maupun pre-compiled

## Contoh Sintaks Masa Depan (Rupalang)

```rpl
navbar {
  class: "bg-transparent"

  onScroll(e) => {
    class = e.height >= 300 ? "bg-blue-500" : "bg-transparent"
  }

  onState(prev) => {
    // react to state
  }
}
```

## Penutup

Aidomx bukan hanya tentang menyederhanakan UI, tapi membawa cara baru dalam menulis interface: lebih ringan, konsisten, dan bebas dari repetisi.

---
