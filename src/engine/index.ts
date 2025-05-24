import { isNil, isArr, type RulesApi, defineConfig } from '@aidomx/core'
import { body, footer, partial } from './aix'
import type { AppInstance, AixEngine } from '@/types'
import { define, ERROR_CODE, handlers, patterns } from './handlers'

type RulesConfig = RulesApi.rulesConfig

let currComp: string = ''
let currCompLines: string[] = []
let newLine = []

const parse = (content: string | null) => {
  if (isNil(content)) {
    return {
      error: ERROR_CODE.NO_CONTENT,
      message: 'No content is writable.',
    }
  }

  let lines = content
    ?.split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const rootCheck = lines!.filter((line) => patterns.root.test(line))

  if (rootCheck!.length > 1) {
    return {
      error: ERROR_CODE.MULTIPLE_ROOT,
      message: 'Only one root is allowed!',
    }
  }

  for (const line of lines!) {
    const rooted = patterns.root.test(line)
    if (rooted) {
      handlers.root(define, line)
      continue
    }
    newLine.push(line)
  }

  for (const line of newLine) {
    const match = line.match(patterns.components)
    if (match) {
      if (currComp) {
        handlers.components(define, currComp, currCompLines)
      }
      currComp = match[1]
      currCompLines = [match[2]]
    } else {
      currCompLines.push(line)
    }
  }

  if (currComp) {
    handlers.components(define, currComp, currCompLines)
  }

  return defineConfig({ define })
}

const render = (app: AppInstance, rules: RulesConfig) => {
  if (!isArr(rules.components)) return []

  return [
    partial(),
    body(rules.root ?? '', rules.components ?? []),
    footer(app.settings.ws_port),
  ].join('\n')
}

const getRoutes = () => {}

const setRoutes = (app: AppInstance) => {}

export const Aix: AixEngine = {
  parse,
  render,
  setRoutes,
  getRoutes,
}

export const jsxEngine = () => {}
