# Aidomx Language

## Pendahuluan

**Aidomx** awalnya dirancang sebagai solusi untuk menyederhanakan struktur proyek **Next.js**, khususnya dalam mengelola banyaknya file yang bertambah seiring kompleksitas proyek.

Konsep awal yang diusung adalah **_ghost component_** — komponen hantu yang dapat dibuat melalui konfigurasi tanpa perlu membuat file satu per satu. Pendekatan ini terbukti efisien, tetap mendukung **Tailwind CSS**, dan berpotensi mendukung integrasi lain di masa depan.

Namun, tantangan mulai muncul saat mengimplementasikan **listener** dan mode **reactive**. Listener berhasil aktif, `alert()` dan `console.log()` berfungsi, tetapi manipulasi terhadap DOMX gagal sepenuhnya. Ini bukan disebabkan oleh kegagalan teknis, melainkan **perbedaan ekosistem internal** yang membuat listener tidak dapat berinteraksi dengan DOMX.

Selain itu, performa menjadi hambatan baru. Maka, langkah besar pun diambil: **Aidomx dibangun ulang menggunakan bahasa C**, untuk mengejar performa yang lebih tinggi dan efisiensi maksimum.

Kini Aidomx menggunakan **server kustom berbasis Node.js** yang bekerja sama dengan build hasil bahasa C dalam menangani konfigurasi dan pembuatan komponen. Dari sinilah Aidomx berkembang menjadi sesuatu yang lebih besar — **framework mandiri dengan bahasa sendiri**.

---

## Masalah & Potensi

Dalam proses membangun bahasa ini dengan C, disadari bahwa **Indonesia belum memiliki bahasa pemrograman yang dikenal secara global** (referensi: ChatGPT). Ini menjadi masalah serius dalam konteks **kemandirian teknologi**.

Padahal, **Indonesia memiliki banyak talenta luar biasa**. Distro Linux buatan anak bangsa pun sudah banyak, tapi potensi ini sering tidak dimaksimalkan. Penyebabnya? Rasa takut: takut tidak menarik, takut tidak layak produksi, dan takut tidak digunakan.

Namun, **setiap masalah punya solusi**. Melangkah ke depan adalah pilihan yang layak dan perlu diambil, demi membuka jalan bagi generasi berikutnya. **Kesempurnaan bukanlah syarat untuk memulai — karena tanpa langkah awal, kesempurnaan pun tak pernah ada.**

---

## Edukasi & Produksi

**Edukasi** bukan hanya soal materi pelajaran yang cepat dilupakan. **Mentalitas dan ketangguhan** juga bagian dari pendidikan — membentuk insan yang siap jadi _produsen teknologi_, bukan hanya _pengguna_.

Di sisi lain, **produksi bisa menjadi sarana edukasi yang konkret**. Apakah bisa langsung digunakan di industri? Mungkin ya, mungkin tidak. Tapi secara logis: **mengejar proyek nyata tidak harus menunggu validasi sempurna** — justru lewat proses itulah kualitas akan terbentuk.

---

## Konsep Sintaks

```aidomx
// Penugasan
x = 1

// Fungsi
hello() {}

// Keyword
print("Hello world")
```

Sintaks Aidomx dirancang sederhana dan ekspresif, dengan gaya scripting yang familiar namun tetap fleksibel untuk pengembangan lanjutan.

---

## Roadmap Pengembangan

- ✅ REPL Mode
- ✅ State History
- ✅ Clear Screen, Clear State History, Clear Token, Clear All
- ✅ Lexer / Tokenize
- ☑ Parse AST (Abstract Syntax Tree)
- ☑ Interpreter, Semantic Check, Safety Type
- ☑ Auto Engine
- ☑ Final

---

### Auto Engine

**Auto Engine** adalah sistem otomatis dalam Aidomx yang bertujuan untuk:

1. **Mendeteksi konteks penggunaan program**, apakah akan digunakan untuk:

   - **Frontend** (kompilasi komponen UI, layout, routing, dsb.)
   - **Backend** (handler API, logic bisnis, state global, rules)
   - **CLI Tools** (build pipeline, REPL, runner, dsb.)
   - **Worker** (task async, background processing, cron)
   - **Hybrid** (integrasi antar mode secara otomatis)

2. **Menyesuaikan mode build dan eksekusi** tanpa perlu konfigurasi eksplisit berulang. Misalnya:
3. **Menghubungkan interpreter dengan engine internal** untuk mendistribusikan hasil parsing langsung ke `runtime context`, baik untuk dijalankan langsung atau dikompilasi ke target sistem (misal WebAssembly, Native Binary, dll).

#### Tujuan Auto Engine:

- **Efisiensi**: cukup satu file `.ai` bisa mengatur logic backend dan frontend.
- **Fleksibilitas**: bisa menjalankan Aidomx sebagai satu sistem utuh tanpa perlu framework lain.
- **Kecerdasan Konteks**: engine bisa mengambil keputusan berdasarkan isi file, bukan hanya file ekstensi.

---

## Lisensi

MIT © 2025 [@aidomx](https://github.com/aidomx)

---

> _"Tidak ada yang salah dengan bermimpi besar, yang salah adalah tidak pernah memulainya."_
> — Aidomx
