import { AidomxDOM, getGlobalAidomx, getGlobalConfig } from '../../core'
import { useWatch } from '../../hooks'

let isInitialized = false

export const withVanilla = async () => {
  if (isInitialized) return
  isInitialized = true

  const config = await getGlobalConfig()
  const publicPath = typeof config.path === 'object' && config.path?.public

  if (typeof config.path === 'object' && config?.path?.query?.length) {
    for (const file of config.path.query) {
      const url = `/${publicPath}/${file}?t=${Date.now()}`
      try {
        const rules = await getGlobalAidomx(url)
        if (rules) AidomxDOM(rules)
        useWatch(url)
      } catch (err) {
        console.warn(`[Aidomx] Gagal load ${file}:`, err)
      }
    }
  } else {
    console.warn('[Aidomx] Tidak ada file yang dimuat (path.query kosong).')
  }
}
