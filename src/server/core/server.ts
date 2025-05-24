import type { IncomingMessage, ServerResponse } from 'http'
import { createApp } from './app'
import { Callback, RouterMethods } from '@/types'

export function createServerApp() {
  const app = createApp()

  app.handle = (req: IncomingMessage, res: ServerResponse) => {
    const route = app.route(req, res)

    if (req.method === 'GET') {
      route.get(req, res)
    } else if (req.method === 'POST') {
      route.post(req, res)
    }
  }

  app.register = {} // Re-init router register

  const router: RouterMethods = {
    get: (path: string, callback: Callback) => app.get(path, callback),
    post: (path: string, callback: Callback) => app.post(path, callback),
  }

  app.Router = router

  return app
}
