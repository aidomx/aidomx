import { useTransformer } from '../hooks/useTransformer'
import type { Config } from '../types'

/**
 * Konfigurasi default untuk AIDOMX.
 * Digunakan jika tidak ada konfigurasi eksternal yang ditemukan.
 */
const DEFAULT_CONFIG: Config = {
  path: 'public',
  eventMap: {},
}

/**
 * Mengambil dan mengubah isi file AIDOMX global dari URL yang diberikan.
 *
 * @param {string} url - URL menuju file `.aidomx`.
 * @returns {Promise<any | null>} - Objek aturan AIDOMX yang sudah diparsing, atau null jika terjadi kesalahan.
 */
export const getGlobalAidomx = async (url: string): Promise<any | null> => {
  try {
    const res = await fetch(url)
    const raw = await res.text()
    return new Function(`return ${useTransformer(raw)}`)()
  } catch (error) {
    console.error(`❌ [Browser] Gagal memuat ${url}:`, error)
    return null
  }
}

/**
 * Mengambil konfigurasi global dari file `/aidomx.config.json`.
 * Jika gagal dimuat, maka akan menggunakan konfigurasi default.
 *
 * @returns {Promise<AIDOMXConfig>} - Objek konfigurasi AIDOMX.
 */
export const getGlobalConfig = async (): Promise<Config> => {
  const url = '/aidomx.config.json?timestamp=' + Date.now()

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Gagal memuat konfigurasi')
    return await response.json()
  } catch (error) {
    console.warn(
      '⚠️ [Browser] Konfigurasi tidak ditemukan, menggunakan default.'
    )
    return DEFAULT_CONFIG
  }
}
