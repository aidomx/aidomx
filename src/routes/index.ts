import type { AppInstance } from '@/types'
import type { RulesApi } from '@aidomx/core'
import { Aix } from '@/engine'

type RulesConfig = RulesApi.rulesConfig

export const swe = (app: AppInstance) => {
  const router = app.Router

  router?.get('/', (req, res) => {
    let rules: RulesConfig = app.settings.rules
    let contents = Aix.render(app, rules)

    res.writeHead(req.statusCode ?? 200, {
      'Content-Type': 'text/html',
    })

    res.end(contents)
  })

  router?.get('/*', (_, res) => {
    res.end('Hello world')
  })

  return router
}
