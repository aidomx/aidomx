import type { IncomingMessage, ServerResponse } from 'http'
import qs from 'querystring'

/**
 * Tipe fungsi callback yang digunakan setelah body diparsing.
 * @param body Hasil parsing dari query string (biasanya dari body request).
 */
export type BodyParserCallback = (body: ReturnType<typeof qs.parse>) => void

/**
 * Tipe data untuk potongan (chunk) buffer yang diterima dari request.
 */
export type Chunk = typeof Buffer

/**
 * Callback standar yang menerima objek request dan response dari HTTP.
 */
export type Callback = (req: IncomingMessage, res: ServerResponse) => void

/**
 * Tipe fungsi callback untuk setiap method HTTP (seperti GET, POST).
 */
export type Method = Callback

/**
 * Konfigurasi opsional yang dapat digunakan dalam aplikasi.
 */
export type Settings<K extends string, T extends any = any> = Record<K, T>

/**
 * Definisi method routing dasar seperti GET dan POST.
 */
export type RouterMethods = {
  /**
   * Menangani permintaan GET pada path tertentu.
   * @param path Rute URL yang ingin ditangani.
   * @param cb Fungsi callback untuk menangani permintaan tersebut.
   */
  get: (path: string, cb: Callback) => void

  /**
   * Menangani permintaan POST pada path tertentu.
   * @param path Rute URL yang ingin ditangani.
   * @param cb Fungsi callback untuk menangani permintaan tersebut.
   */
  post: (path: string, cb: Callback) => void
}

/**
 * Antarmuka inti dari aplikasi (server) yang menangani HTTP request.
 */
export interface AppInstance {
  /**
   * Menangani rute GET.
   * @param path URL path
   * @param cb Fungsi callback
   */
  get: (path: string, cb: Method) => void

  /**
   * Menangani rute POST.
   * @param path URL path
   * @param cb Fungsi callback
   */
  post: (path: string, cb: Method) => void

  /**
   * Memulai server dan mulai mendengarkan permintaan masuk.
   */
  listen: (...args: any[]) => void

  /**
   * Menyimpan atau menerapkan konfigurasi ke dalam aplikasi.
   * @param options Obyek konfigurasi
   */
  use(...options: any[]): void

  /**
   * Direktori utama tempat aplikasi dijalankan.
   */
  dirname(dir: string): string

  /**
   * Fungsi utama yang menangani seluruh request.
   */
  handle: (req: IncomingMessage, res: ServerResponse) => void

  /**
   * Routing request berdasarkan method dan path.
   */
  route(req: IncomingMessage, res: ServerResponse): Record<string, any>

  /**
   * Method HTTP yang sedang aktif untuk request saat ini.
   */
  requestMethod: string

  /**
   * Menyimpan modul, route, atau plugin yang telah didaftarkan.
   */
  register: Record<string, any>

  /**
   * Menyimpan konfigurasi aplikasi secara umum.
   */
  settings: Settings<any>

  /**
   * Fungsi fallback ketika rute tidak ditemukan.
   */
  missing: Callback

  /**
   * Fungsi fallback ketika method HTTP tidak didukung.
   */
  missingRequestMethod: Callback

  /**
   * Fungsi untuk membaca dan mem-parsing body dari request.
   */
  bodyParser: (req: IncomingMessage, cb: BodyParserCallback) => void

  /**
   * (Opsional) Sistem routing modular tambahan.
   */
  Router?: RouterMethods

  version?: string | number
}

export type Request = IncomingMessage
export type Response = ServerResponse
