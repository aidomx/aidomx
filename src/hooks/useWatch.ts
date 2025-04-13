import { getGlobalAidomx } from '../core'
import { AidomxDOM } from '../core/aidomx-dom'

// 🔄 Watch perubahan file AIDOMX
export const useWatch = (url: string) => {
  setInterval(async () => {
    const rules = await getGlobalAidomx(url)
    if (rules) AidomxDOM(rules)
  }, 2000)
}
