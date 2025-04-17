import { registry } from './registry'

/**
 * Start With Environment
 *
 * Adalah sebuah entry file yang akan digunakan untuk
 * menentukan environment yang sedang dibuat.
 *
 * @param schema string
 * @returns module
 */
export const swe = (schema: string = '') => registry[schema]
