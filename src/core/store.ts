import type { Rules as Raw } from '../types'
import { Parse } from './parse'

/**
 * Global store untuk menyimpan hasil parsing AIDOMX
 * dan menyediakan akses ke class map secara konsisten.
 */
export const Store = {
  /**
   * Hasil parsing globals.aidomx untuk menyimpan rules.
   */
  classMap: {} as Record<string, string>,
  /**
   * Menandakan apakah store sudah tersimpan dan siap digunakan.
   * @type boolean
   */
  isReady: false as boolean,

  set(raw: Raw) {
    this.classMap = Parse(raw)
    this.isReady = true
  },

  get(name: string = '') {
    return this.classMap[name]
  },

  getReady() {
    return this.isReady
  },

  /**
   * Menetapkan class map berdasarkan rules AIDOMX.
   * @param raw - Objek rules AIDOMX mentah.
   */
  setRaw(raw: Raw) {
    console.log('[Aidomx] Store is now ready with parsed rules.')
    return this.set(raw)
  },

  /**
   * Mengambil nilai class berdasarkan nama alias.
   * @param name - Nama key/alias yang diambil dari hasil parsing AIDOMX.
   * @returns Nilai class string, atau `undefined` jika tidak ditemukan.
   */
  getRaw(name: string) {
    return this.classMap[name]
  },

  /**
   * Mendapat seluruh class map (opsional untuk debugging).
   * @returns Semua class map sebagai objek.
   */
  getAll() {
    return this.classMap
  },
}
