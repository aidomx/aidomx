# Aidomx

**Aidomx** adalah kerangka kerja eksperimental untuk membangun antarmuka dengan pendekatan deklaratif dan reaktif. Masih dalam tahap awal pengembangan dan sangat terbuka untuk eksplorasi serta kontribusi.

## Struktur Project (Preview)

Struktur masa depan project dari aidomx:

```
my-project/
├── app/
│   └── index.ai         ← logic entry
├── res/             ← resource
│   └── index.ai     ← entry resource
├── .env.local       ← konfigurasi runtime (WEB_ENGINE, PORT, dsb)
├── package.json
├── tsconfig.json
├── index.ai ← file utama yang akan dimuat pertama kali.
```

Struktur ini memungkinkan isolasi logika, styling, dan konfigurasi secara bersih dan scalable.

---

## Instalasi

```bash
npm install aidomx --global
```

---

## Cara Penggunaan

Berikut adalah langkah-langkah untuk mencoba **Aidomx**:

### 1. Clone Repository

```bash
git clone https://github.com/aidomx/aidomx.git
```

Aidomx sudah menyediakan daftar perintah CLI berikut:

- `init` _(eksperimental)_ — Membuat proyek baru
- `dev` — Menjalankan server lokal
- `start` _(eksperimental)_
- `help` atau `-h` — Bantuan
- `version` atau `-v` — Versi
- `generate` _(eksperimental)_

Jalankan:

```bash
cd aidomx
node bin/aidomx.js
```

Ini akan menampilkan semua perintah CLI yang tersedia.

---

### 2. Menjalankan Proyek

Fitur ini masih terbatas dan sedang dalam tahap pengembangan.

#### a. Buat file `index.ai`

Pastikan Anda berada di direktori `aidomx`. Berikut contoh isi file `index.ai`:

```ai
root "app"

components.hello {
  design: {
    type: "div",
    className: "px-2"
  },
  content: "Hello world"
}
```

#### b. Jalankan server lokal

```bash
node bin/aidomx.js dev
```

Buka `http://localhost:3000` di browser Anda.
Silakan ubah nilai `components.hello.content` untuk melihat perubahan. **Aidomx** mendukung live reload secara otomatis.

---

## Status

Aidomx masih dalam tahap pengembangan awal dan belum siap digunakan dalam proyek skala produksi.

---

## Kritik dan Saran

Kami sangat terbuka terhadap masukan.
Silakan kirimkan `Issue` atau `Pull Request` di [GitHub](https://github.com/aidomx/aidomx) untuk membantu pengembangan lebih lanjut.

---

Terima kasih telah mencoba **Aidomx**.
