import { type IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { join, extname, resolve } from 'path'
import { readFileSync } from 'fs'
import { mimeTypes } from './utils'
/**
 * Mengembalikan handler untuk menangani permintaan yang tidak memiliki rute yang sesuai.
 * Handler ini akan merespons dengan status 404 dan pesan yang dapat disesuaikan melalui pengaturan.
 * Cocok digunakan sebagai fallback saat tidak ada rute yang cocok ditemukan.
 * @param settings - Objek pengaturan global aplikasi, dapat berisi pesan khusus untuk tanggapan 404.
 * @returns Fungsi callback yang digunakan sebagai handler untuk permintaan yang tidak ditemukan. */
export const missing =
  (settings: any) => (req: IncomingMessage, res: ServerResponse) => {
    const url = parse(req.url || '', true)
    const filepath = settings.public
      ? join(settings.public, url.pathname!)
      : join(resolve('public'), url.pathname!)

    try {
      const data = readFileSync(filepath)
      const ext = extname(filepath).toLowerCase()
      const contentType = mimeTypes[ext] || 'text/plain'

      res.writeHead(200, { 'Content-Type': contentType })
      res.write(data)
      res.end()
      console.log(
        '🌏 %s %s %s %s',
        req.method,
        res.statusCode,
        new Date(),
        req.url
      )
    } catch (e) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write(`[${req.method}] No route registered for ${url.pathname}`)
      res.end()

      console.log(
        '🌏 %s %s %s %s',
        req.method,
        res.statusCode,
        new Date(),
        req.url
      )
    }
  }

export const missingRequestMethod = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.writeHead(400, { 'Content-Type': 'text/plain' })
  res.write(
    `Router [${req.method}] diperlukan untuk menangani permintaan url: ${req.url}`
  )
  res.end()
  console.log('🌏 %s %s %s %s', req.method, res.statusCode, new Date(), req.url)
}
