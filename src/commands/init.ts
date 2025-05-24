import prompts from 'prompts'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import path from 'path'
import pkg from '../../package.json'

export const Initialize = async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: 'Project Name:',
      initial: 'my-project',
    },
    {
      type: 'select',
      name: 'schema',
      message: 'Select Web Schema:',
      choices: [
        { title: 'vanilla', value: 'vanilla' },
        { title: 'react', value: 'react' },
        { title: 'vite', value: 'vite' },
        { title: 'next', value: 'next' },
      ],
    },
    {
      type: 'select',
      name: 'ui',
      message: 'Select UI Framework:',
      choices: [
        { title: 'tailwindcss', value: 'tailwindcss' },
        { title: 'bootstrap', value: 'bootstrap' },
        { title: 'material', value: 'material' },
      ],
    },
  ])

  const cancelCreateProject = (): boolean => {
    if (!response?.projectName) return true
    if (!response?.schema) return true
    if (!response?.ui) return true
    return false
  }

  const isCancelled: boolean = cancelCreateProject()

  if (isCancelled) return

  const projectPath = path.resolve(process.cwd(), response.projectName)
  const envPath = path.join(projectPath, '.env.local')
  const resPath = path.join(projectPath, 'res')
  const appPath = path.join(projectPath, 'app')
  const pkgPath = path.join(projectPath, 'package.json')

  if (!isCancelled) {
    if (!existsSync(projectPath)) mkdirSync(projectPath, { recursive: true })

    // Buat struktur project
    if (!existsSync(resPath)) mkdirSync(resPath)
    if (!existsSync(appPath)) mkdirSync(appPath)

    writeFileSync(
      envPath,
      `WEB_SCHEMA="${response.schema}"\nUI_FRAMEWORK="${response.ui}"`
    )

    writeFileSync(
      path.join(resPath, 'index.ts'),
      `export const theme = "${response.ui}"\n`
    )

    writeFileSync(
      pkgPath,
      `{
        "name": "${response.projectName}",
        "version": "1.0.0",
        "main": "index.js",
        "devDependencies": {
          "aidomx": "^${pkg.version}"
        }
      }`
    )

    console.log(
      `\n ✔ Project "${response.projectName}" initialized with schema: ${response.schema}, UI: ${response.ui}`
    )
  }
}
