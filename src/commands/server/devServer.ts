import { createServerApp } from '@aidomx/server'
import chalk from 'chalk'
import { performance } from 'perf_hooks'
import { printServerInfo } from '@/utils/printServerInfo'
import { envScanner } from '@/utils/envScanner'
import type { Request, Response } from '@/src/types'

const SERVER_VERSION = '0.0.1'
const web = {
  protocol: process.env.PROTOCOL || 'http://',
  hostname: process.env.HOSTNAME || '127.0.0.1',
  port: Number(process.env.PORT || 3000),
}

/**
 * Menghitung waktu yang dibutuhkan untuk memulai server.
 * @returns Durasi dalam detik sebagai string.
 */
const loading = (start: number) => (performance.now() - start / 1000).toFixed(2)

/**
 * Menjalankan pemindaian file `.env` dan menampilkan informasi awal server.
 * @returns Objek berisi status env dan fungsi untuk mencetak info server.
 */
const reportStartServer = (start: number) => {
  const env = envScanner()

  const envResult = () => {
    const duration = loading(start)

    if (env?.status) {
      console.log(
        chalk.green(` ✓ `) + `Membaca file ${env.fileName} - ${duration}s`
      )

      return true
    }
    console.log(chalk.red(` x `) + `Gagal membaca file env - ${duration}s`)

    return false
  }

  const message = () => {
    const duration = loading(start)
    const result = envResult()

    if (result) {
      console.log(chalk.green(` ✓ `) + `Ready in ${duration}s`)
      console.log()
    } else {
      console.log(chalk.red(` x `) + `Gagal menjalankan server - ${duration}s`)
      process.exit(1)
    }
  }

  return { env, message }
}

/**
 * Menjalankan server dalam mode pengembangan.
 * - Akan menampilkan halaman error jika file `.env` tidak ditemukan.
 * - Jika ada, akan menampilkan pesan 404 default.
 */
export const devServer = () => {
  const app = createServerApp()
  const start = performance.now()
  const report = reportStartServer(start)

  app.get('*', (_: Request, res: Response) => {
    if (!report?.env.status) {
      res.writeHead(500, { 'Content-Type': 'text/html' })
      res.end(
        `
        <h1>500 - Environment tidak ditemukan</h1>
        <p>Harap buat file .env untuk konfigurasi server.</p>
      `.trim()
      )
    } else {
      res.writeHead(404)
      res.end('404 - Tidak ditemukan')
    }
  })

  printServerInfo(web.port, SERVER_VERSION)

  app.listen(web.port, () => report.message())

  return app
}
