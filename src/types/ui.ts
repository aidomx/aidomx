// /**
//  * Konfigurasi umum untuk proses render atau transformasi.
//  */
// export type Config = {
//   /**
//    * Jalur input atau konfigurasi jalur:
//    * - Bisa berupa string (jalur ke direktori/file)
//    * - Atau objek yang menentukan jalur publik dan parameter query
//    */
//   path?:
//     | {
//         /** Jalur publik, misalnya untuk akses URL atau file statis */
//         public?: string
//         /** Parameter query opsional untuk proses filter atau seleksi */
//         query?: string[]
//       }
//     | string

//   /**
//    * Pemetaan event DOM, misalnya:
//    * `{ onClick: 'handleClick' }`
//    */
//   eventMap?: Record<string, string>
// }

/**
 * Struktur komponen UI yang dapat dirender atau dibentuk.
 */
export type Component = {
  /** Nama internal atau identifier dari komponen */
  name?: string

  /** Nama tag HTML, contoh: div, span, button */
  tagName?: string

  /** Nama class CSS */
  className?: string

  /** Konten teks dalam komponen */
  text?: string

  /** Gaya inline CSS dalam bentuk objek */
  style?: Record<string, string>

  /** Tempatkan sebelum elemen lain jika true */
  posBefore?: boolean

  /** Tempatkan setelah elemen lain jika true */
  posAfter?: boolean

  /** Properti tambahan lainnya */
  [key: string]: any
}

/**
 * Aturan atau template struktur UI secara menyeluruh.
 */
export type Rules = {
  /** Selector root utama, contoh: #app atau body */
  root?: string

  /** Gaya global atau default */
  style?: Record<string, string>

  /** Daftar komponen untuk dirender */
  components?: Component[]

  /** Properti tambahan lainnya */
  [key: string]: any
}

/**
 * Data untuk proses render, bisa berupa aturan lengkap (Rules)
 * atau pasangan key-value untuk inject ke template.
 */
export type Data = Rules | Record<string, string>
