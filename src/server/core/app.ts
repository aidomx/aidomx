import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { getRouter } from './router'
import { missing, missingRequestMethod } from './handler'
import { dirname, bodyParser } from './utils'
import { AppInstance, Method, RouterMethods, Settings } from '@/types'
import pkg from '../../../package.json'

let settings: Settings<any> = {}
let register: Record<string, any> = {}
let requestMethod: string = ''

/**
 * Membuat instance aplikasi baru.
 * Fungsi ini akan mengatur routing, middleware, dan listener HTTP.
 *
 * @returns Record Instance aplikasi dengan metode untuk routing dan konfigurasi.
 */
export const createApp = (): AppInstance => {
  /**
   * Fungsi utama untuk menangani permintaan masuk.
   * Akan memanggil handler berdasarkan path dan method dari permintaan.
   *
   * @param req Permintaan HTTP yang masuk.
   * @param res Respons HTTP yang akan dikirim.
   */
  const handle = (req: IncomingMessage, res: ServerResponse) => {
    const url = parse(req.url || '', true)
    const handler = register[url.pathname || '']

    if (req?.method)
      return handler
        ? handler[req.method.toLowerCase()](req, res)
        : missing(settings)(req, res)
  }

  return {
    /**
     * Mendaftarkan handler untuk permintaan GET pada path tertentu.
     *
     * @param path Rute path (URL) yang ingin didaftarkan.
     * @param method Fungsi handler untuk rute tersebut.
     */
    get(path: string, method: Method) {
      register[path] = getRouter(method, this, settings)
    },

    /**
     * Mendaftarkan handler untuk permintaan POST pada path tertentu.
     *
     * @param path Rute path (URL) yang ingin didaftarkan.
     * @param method Fungsi handler untuk rute tersebut.
     */
    post(path: string, method: Method) {
      requestMethod = 'POST'
      register[path] = getRouter(method, this, settings)
    },

    /**
     * Menjalankan server HTTP dan mulai mendengarkan permintaan pada port tertentu.
     *
     * @param args Argumen seperti port dan callback jika dibutuhkan.
     */
    listen(...args: any[]) {
      return createServer(handle).listen(...args)
    },

    /**
     * Menambahkan konfigurasi atau pengaturan khusus untuk instance aplikasi.
     *
     * @param options Objek pengaturan yang ingin disisipkan.
     */
    use(...options: []) {
      options.reduce((key, value) => (settings[key] = value))
    },

    /** Direktori kerja aktif dari server */
    dirname,

    /** Alias dari route: handler utama permintaan */
    handle,

    /** Alias dari handle: untuk konsistensi penggunaan nama */
    route: handle,

    /** Method terakhir yang diminta (biasanya digunakan internal) */
    requestMethod,

    /** Objek penyimpanan semua rute yang telah terdaftar */
    register,

    /** Pengaturan global untuk aplikasi */
    settings,

    /** Handler default jika route tidak ditemukan */
    missing: missing(settings),

    /** Handler default jika method tidak dikenali */
    missingRequestMethod,

    /** Parser untuk body (misalnya dari POST) */
    bodyParser,

    /** Struktur router tambahan, bisa diperluas sesuai kebutuhan */
    Router: {} as RouterMethods,

    /** Versi dari package saat ini (diambil dari package.json) */
    version: pkg.version,
  }
}
