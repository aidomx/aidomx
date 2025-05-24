import type { RulesApi } from '@aidomx/core'
import type { AppInstance } from './server'

type RulesConfig = RulesApi.rulesConfig

export type AixEngine = {
  parse(content: string | null): void | Record<string, any> | RulesConfig

  setRoutes(app: AppInstance): void

  getRoutes(): void

  render(app: AppInstance, rules: RulesConfig): void
}
