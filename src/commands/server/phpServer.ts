/**
 * Menjalankan server PHP
 * - Gunakan PHP bawaan: php -S localhost:8080 -t public/
 */
import { spawn } from 'child_process'
import path from 'path'

export const startPHP = () => {
  const publicDir = path.join(process.cwd(), 'public')

  const server = spawn('php', ['-S', 'localhost:8080', '-t', publicDir], {
    stdio: 'inherit',
  })

  server.on('close', (code) => {
    console.log(`PHP server berhenti dengan kode ${code}`)
  })
}
