import { Parse } from './parse'
import type { Rules } from '../types'

export const defineRules = (rules: Rules) => Parse(rules)
