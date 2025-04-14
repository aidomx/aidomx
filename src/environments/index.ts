import type { Rules } from '../types'
import { withReact, withVanilla, withVite } from './presets'

/**
 * Memulai AIDOMX berdasarkan environment secara async.
 *
 * Cocok digunakan untuk environment berbasis browser (seperti vanilla JS, classic setup).
 * Fungsi ini otomatis membaca konfigurasi `aidomx.config.json` dan file aturan global.
 *
 * @param {string} [schema=''] - Nama skema environment, seperti `'vanilla'`, `'classic'`
 * @returns {Promise<void>} - Proses inisialisasi asynchronous.
 *
 * @example
 * await startWithEnvironment('vanilla')
 */
const startWithEnvironment = async (
  schema: string = ''
): Promise<void | Rules> => {
  switch (schema) {
    case 'vanilla':
    case 'vanillajs':
    case 'classic':
      return await withVanilla()

    case 'vite':
      return await withVite()

    case 'next':
    case 'react':
    case 'nextjs':
    case 'reactjs':
      return await withReact()

    default:
      throw new Error(`[Aidomx] Unknown env ${schema}`)
  }
}

export { startWithEnvironment as swe }
