import chalk from 'chalk'
import boxen from 'boxen'
import os from 'os'

const getLocalIP = () => {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return '127.0.0.1'
}

export const printServerInfo = (port: number, version = '0.0.1') => {
  const localIP = '127.0.0.1'
  const publicIP = getLocalIP()
  const protocol = 'http://'

  const content = [
    `${chalk.cyan('@aidomx/server')} ${chalk.gray(version)}`,
    `${chalk.gray('→')} Local   : ${chalk.green(`${protocol}${localIP}:${port}`)}`,
    `${chalk.gray('→')} Network : ${chalk.green(`${protocol}${publicIP}:${port}`)}`,
  ].join('\n')

  const box = boxen(content, {
    padding: 1,
    borderColor: 'cyan',
    borderStyle: 'round',
    title: 'Server Info',
    titleAlignment: 'center',
  })

  console.log('\n' + box + '\n')
  console.log(chalk.green(' ✓ ') + 'Starting...')
}
