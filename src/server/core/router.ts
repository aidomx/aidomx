import { IncomingMessage, ServerResponse } from 'http'
import { bodyParser } from './utils'
import type { AppInstance, Method, Settings } from '@/types'

export const getRouter = (
  method: Method,
  app: AppInstance,
  _settings: Settings<any>
) => {
  return {
    get: (req: IncomingMessage, res: ServerResponse) => {
      res.addListener('redirect', (url: string) => {
        res.writeHead(301, { location: url })
        res.end()
      })

      console.log(
        '🌏 %s %s %s %s',
        req.method,
        res.statusCode,
        new Date(),
        req.url
      )

      return method(req, res)
    },

    post: (req: IncomingMessage, res: ServerResponse) => {
      if (app.requestMethod !== req.method)
        return app.missingRequestMethod(req, res)
      bodyParser(req, (result) => {
        req.emit('body', result)
        return method(req, res)
      })

      console.log(
        '🌏 %s %s %s %s',
        req.method,
        res.statusCode,
        new Date(),
        req.url
      )
    },
  }
}
