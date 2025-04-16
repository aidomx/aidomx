import { registry } from './registry'

/**
 * Memulai AIDOMX berdasarkan environment secara async.
 *
 * Cocok digunakan untuk environment berbasis browser (seperti vanilla JS, classic setup).
 * Fungsi ini otomatis membaca konfigurasi `aidomx.config.json` dan file aturan global.
 *
 * @param {string} [schema=''] - Nama skema environment, seperti `'vanilla'`, `'classic'`
 *
 * @example
 * await startWithEnvironment('vanilla')
 */
export const swe = (schema: string = '') => registry[schema]
