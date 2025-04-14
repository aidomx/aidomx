// utils/extensions.ts
export const extensions = ['.js', '.ts', '.json']

/**
 * Mengimpor file dengan berbagai ekstensi.
 * Untuk `aidomx.config`, hanya mencoba `.js` dan `.ts`
 */
export const getWithExtensions = async (file: string): Promise<any | null> => {
  const isConfig = file.includes('aidomx.config')
  for (const ext of extensions) {
    if (isConfig && (ext === '.js' || ext === '.ts')) continue

    try {
      const mod = await dynamicImport(file + ext)
      return mod
    } catch {
      // Abaikan error
    }
  }

  console.warn(`[Aidomx] Tidak menemukan file untuk: ${file}`)
  return null
}

export const dynamicImport = async (file: string): Promise<any> => {
  return await import(file)
}
