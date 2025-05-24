import { readFileSync } from 'fs'
import pkg from '../package.json'
import { choiceServer, devServer, Initialize, Usage } from './commands'
import { Aix } from './engine'
import { swe } from './routes'
import chokidar from 'chokidar'
import path from 'path'
import { WebSocketServer } from 'ws'
import { is, isWarn } from '@aidomx/core'
import type { AppInstance } from './types'
import { getAvailablePort } from './commands/server/devServer'

const CLI_VERSION = pkg.version

/**
 * Daftar perintah CLI yang tersedia.
 */
type CommandLists = {
  init(): Promise<void>
  create(): Promise<void>
  dev(): Promise<AppInstance>
  generate(): void
  start(): void
  help(): void
  '-h'(): void
  version(): void
  '-v'(): void
}

const args = process.argv.slice(2)
const broadcast = new Map()
const projectIndex = path.resolve('index.ai')

/**
 * Melakukan inisialisasi ulang project setiap terjadi perubahan file.
 * @param app - Instance aplikasi
 * @returns Instance aplikasi dengan aturan terbaru
 */
const onStart = (app: AppInstance): AppInstance => {
  const content = readFileSync(projectIndex, 'utf-8')

  if (is(app.settings.engine, 'aix')) {
    const parsed = Aix.parse(content)
    app.settings.rules = parsed
  }

  return app
}

/**
 * Memulai chokidar watcher untuk merespon perubahan pada file utama.
 * @param app - Instance aplikasi
 * @returns Chokidar FSWatcher
 */
const onWatch = (app: AppInstance) => {
  return chokidar
    .watch(projectIndex, {
      ignoreInitial: true,
      interval: 150,
      usePolling: true,
    })
    .on('change', () => {
      onStart(app)
      const socket = app.settings.socket ?? broadcast.get('socket')
      if (socket) broadcastReload(socket)
    })
    .on('error', (e) => isWarn((e as Error).message))
}

/**
 * Mendapatkan mesin compiler
 *
 * @returns string atau default: "aix"
 */
const getEngine = (): string => process.env.WEB_ENGINE ?? 'aix'

/**
 * Mendapatkan port yang terdaftar pada broadcast map
 *
 * @returns number atau default: 35729
 */
const getSocketPort = (): number => broadcast.get('ws_port') ?? 35729

/**
 * Mendapatkan instance WebSocket dari broadcast map.
 * @returns WebSocketServer atau null
 */
const getSocket = (): WebSocketServer | null => broadcast.get('socket') ?? null

/**
 * Menangani semua daftar perintah CLI.
 */
const commandLists: CommandLists = {
  init: async () => await Initialize(),
  create: async () => await Initialize(),
  dev: async (): Promise<AppInstance> => {
    const { app } = await devServer()

    app.use('engine', getEngine())
    app.use('ws_port', getSocketPort())
    app.use('socket', getSocket())

    onStart(app)
    onWatch(app)
    app.use('/', swe(app))

    return app
  },
  generate: () => isWarn('Upcoming features...'),
  start: () => choiceServer(args[1]),
  help: () => console.log(Usage),
  '-h': () => commandLists.help(),
  version: () => console.log(`Aidomx CLI v${CLI_VERSION}`),
  '-v': () => commandLists.version(),
}

/**
 * Mengirim sinyal `reload` ke semua klien WebSocket.
 * @param socket - Instance WebSocketServer
 */
const broadcastReload = (socket: WebSocketServer) => {
  for (const client of socket.clients) {
    if (client.readyState === 1) {
      client.send('reload')
    }
  }
}

/**
 * Menentukan command mana yang dijalankan oleh CLI.
 * @param args - Nama command
 */
const prepareSystem = (args: string) => {
  const command = args as keyof typeof commandLists
  if (!(command in commandLists)) return commandLists.help()
  return commandLists[command]()
}

/**
 * Mempersiapkan server WebSocket LiveReload.
 * Menggunakan port default 35729 atau mencari yang tersedia.
 * @returns Promise WebSocketServer
 */
const prepareWebSocket = async (): Promise<WebSocketServer> => {
  let port = Number(process.env.WS_PORT || 35729)
  const isFree = await getAvailablePort(port)

  if (!isFree) port++

  const socket = new WebSocketServer({ port })
  socket.on('connection', (event) => event.send('connected'))
  socket.on('error', (e) => isWarn((e as Error).message))

  broadcast.set('ws_port', port)

  return socket
}

/**
 * Fungsi utama yang dijalankan saat memanggil CLI.
 * Mempersiapkan semua komponen tergantung command.
 */
export const createNewCLI = async (): Promise<void | AppInstance> => {
  const command = args[0]
  const system = prepareSystem(command)

  if (command === 'dev') {
    const socket = await prepareWebSocket()
    broadcast.set('socket', socket)
    return system
  }

  return system
}
