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
  const result: Record<string, any> = {}

  for (const file of CANDIDATES) {
    const fullPath = path.join(cwd, file)

    const fileCheck = fs.existsSync(fullPath)

    if (fileCheck) {
      return Object.assign(result, {
        status: true,
        fileName: file,
        filePath: fullPath,
      })
    } else {
      Object.assign(result, { status: false })
    }
  }

  return result
}
