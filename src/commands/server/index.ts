import { startPHP } from './phpServer'

export const choiceServer = (name: string) => {
  try {
    if (name === 'php' || name === '--php') {
      return startPHP()
    } else if (name === 'node' || name === '--node') {
      console.log('Server node is not ready.')
    } else {
      console.warn('❌ Tidak dapat menjalankan server: ', name)
    }
  } catch (error) {
    console.warn('❌ Oops..server not running...')
    return
  }
}

export { devServer } from './devServer'
