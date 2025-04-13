import type { Rules } from '../types'
import { Store } from './store'

export const Compiler = (rules: Rules) => Store.setRaw(rules)
