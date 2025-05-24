import { IncomingMessage } from 'http'
import { parse } from 'querystring'
import { resolve } from 'path'
import type { BodyParserCallback } from '@/types'

export const bodyParser = (
  req: IncomingMessage,
  callback: BodyParserCallback
) => {
  let body = ''
  req.setEncoding('utf-8')
  req.on('data', (chunk) => (body += chunk))
  req.on('end', () => callback(parse(body)))
}

export const dirname = (directory: string) => resolve(directory)

export const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.min.js': 'text/javascript',
  '.css': 'text/css',
  '.min.css': 'text/css',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
}
