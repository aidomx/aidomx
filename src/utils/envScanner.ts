import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { envScanResult } from '../types'

const CANDIDATES = ['.env.local', '.env.production', '.env']

export const envScanner = () => {
  const env = scanEnvFiles()

  if (env.status) {
    dotenv.config({ path: env.filePath })
  }

  return env
}

export const scanEnvFiles = (): envScanResult => {
  const cwd = process.cwd()

  for (const file of CANDIDATES) {
    const fullPath = path.join(cwd, file)

    if (fs.existsSync(fullPath)) {
      return {
        status: true,
        fileName: file,
        filePath: fullPath,
      }
    }
  }

  return { status: false }
}
