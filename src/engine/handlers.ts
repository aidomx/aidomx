import { isArr, type RulesApi } from '@aidomx/core'

type RulesConfig = RulesApi.rulesConfig

type Handlers = {
  root(define: RulesConfig, line: string): RulesConfig
  components(
    define: RulesConfig,
    name: string,
    buffer: string[]
  ): RulesConfig | Record<string, any>
}

export const patterns = {
  root: /(^[root]+\s+.[\w]+.)/,
  components: /^components\.([\w]+)\s+(.+)$/,
}

export const ERROR_CODE = {
  NO_CONTENT: 301,
  MULTIPLE_ROOT: 302,
}

export let define: RulesConfig = {
  root: '',
  components: {},
}

/**
 * String to Object
 *
 * @returns object regular
 * @ref https://stackoverflow.com/questions/1086404/string-to-object-in-js
 */
const sto = (origin: string) =>
  origin.replace(/(\w+:)|(\w+ :)/g, (curr) => {
    return '"' + curr.substring(0, curr.length - 1) + '":'
  })

export const handlers: Handlers = {
  root(define, line) {
    const match = line.match(patterns.root)
    if (isArr(match)) {
      const current = match[1]
        .split('"')
        .map((m) => m.trim())
        .filter(Boolean)

      define.root = current[1]
    }
    return define
  },

  components(define, name, buffer) {
    let origin = sto(buffer.join(' '))
    let diff = JSON.parse(origin)

    try {
      define.components = {
        ...define.components,
        [name]: {
          name,
          ...diff,
        },
      }

      return define
    } catch (err) {
      return {
        error: 303,
        message: `Invalid JSON structure in component "${name}"`,
      }
    }
  },
}
