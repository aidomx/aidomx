import type { AppInstance, Request, Response } from '@/types'
import { envScanner } from '@/utils/envScanner'
import { printServerInfo } from '@/utils/printServerInfo'
import { createServerApp } from '@/server'
import chalk from 'chalk'
import { performance } from 'perf_hooks'
import { createServer } from 'net'

type WebInstance = {
  protocol: string
  hostname: string
  port: number
}

const SERVER_VERSION = '0.0.1'

const web: WebInstance = {
  protocol: process.env.PROTOCOL || 'http://',
  hostname: process.env.HOSTNAME || '127.0.0.1',
  port: Number(process.env.PORT || 3000),
}

/**
 * Get Available port
 *
 * Analisis port yang sedang aktif
 *
 * @param port number
 * @returns boolean
 */
export const getAvailablePort = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => {
      server.close()
      resolve(true)
    })

    server.listen(port)
  })
}

/**
 * Menghitung waktu yang dibutuhkan untuk memulai server.
 * @returns Durasi dalam detik sebagai string.
 */
const loading = (start: number) => {
  const end = performance.now()
  const delay = end - start

  return delay.toFixed(2)
}

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
export const devServer = async (): Promise<{
  app: AppInstance
  env: ReturnType<typeof reportStartServer>
  web: WebInstance
}> => {
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

  const isFree = await getAvailablePort(web.port)
  const port = !isFree ? web.port + 1 : web.port

  printServerInfo(port, SERVER_VERSION)
  app.listen(port, () => report.message())

  return { app, env: report, web }
}
