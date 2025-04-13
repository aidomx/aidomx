import { defineRules } from '../../core/defineRules'
import type { Rules } from '../../types'
import { getWithExtensions } from '../../utils/extensions'

export const withReact = async (): Promise<Rules> => {
  const configMod = await getWithExtensions('aidomx.config')
  const config = configMod?.default || configMod || {}

  const queries: string[] = config?.path?.query || []
  const rules: Rules = {}

  for (const query of queries) {
    const imported = await getWithExtensions(`${config?.path?.public}/${query}`)

    const extracted = imported?.default || imported
    if (Array.isArray(extracted)) {
      // Jika langsung array of component
      rules.components = [...(rules.components || []), ...extracted]
    } else if (Array.isArray(extracted?.components)) {
      // Jika object dengan key components
      rules.components = [...(rules.components || []), ...extracted.components]
    }
  }

  return defineRules(rules)
}
