export const defaultCodeIconMap = {
  'package.json': 'vscode-icons:file-type-node',
  'tsconfig.json': 'vscode-icons:file-type-tsconfig',
  '.npmrc': 'vscode-icons:file-type-npm',
  '.editorconfig': 'vscode-icons:file-type-editorconfig',
  '.prettierrc': 'vscode-icons:file-type-light-prettier',
  '.prettierignore': 'vscode-icons:file-type-light-prettier',
  '.eslintrc': 'vscode-icons:file-type-eslint',
  '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
  '.eslintignore': 'vscode-icons:file-type-eslint',
  'eslint.config.js': 'vscode-icons:file-type-eslint',
  'eslint.config.mjs': 'vscode-icons:file-type-eslint',
  'eslint.config.cjs': 'vscode-icons:file-type-eslint',
  '.gitignore': 'vscode-icons:file-type-git',
  'yarn.lock': 'vscode-icons:file-type-yarn',
  '.env': 'vscode-icons:file-type-dotenv',
  '.env.example': 'vscode-icons:file-type-dotenv',
  '.vscode/settings.json': 'vscode-icons:file-type-vscode',
  '.nuxtrc': 'vscode-icons:file-type-nuxt',
  '.nuxtignore': 'vscode-icons:file-type-nuxt',
  'nuxt.config.js': 'vscode-icons:file-type-nuxt',
  'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
  'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
  'tailwind.config.js': 'vscode-icons:file-type-tailwind',
  'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
  vue: 'vscode-icons:file-type-vue',
  html: 'vscode-icons:file-type-html',
  css: 'vscode-icons:file-type-css',
  ts: 'vscode-icons:file-type-typescript',
  tsx: 'vscode-icons:file-type-typescript',
  typescript: 'vscode-icons:file-type-typescript',
  js: 'vscode-icons:file-type-js',
  jsx: 'vscode-icons:file-type-js',
  javascript: 'vscode-icons:file-type-js',
  md: 'vscode-icons:file-type-markdown',
  mdc: 'vscode-icons:file-type-markdown',
  npm: 'vscode-icons:file-type-npm',
  pnpm: 'vscode-icons:file-type-pnpm',
  npx: 'vscode-icons:file-type-npm',
  yarn: 'vscode-icons:file-type-yarn',
  bun: 'vscode-icons:file-type-bun',
  yml: 'vscode-icons:file-type-yaml',
  yaml: 'vscode-icons:file-type-yaml',
  json: 'vscode-icons:file-type-json',
  sh: 'vscode-icons:file-type-shell',
  bash: 'vscode-icons:file-type-shell'
}

export interface MdcpConfig {
  codeIconMap?: Record<string, string>
  codeBlock?: {
    enableFold?: boolean
    foldHeight?: number
  }
}

export const defaultMdcpConfig = {
  codeIconMap: defaultCodeIconMap,
  codeBlock: {
    enableFold: true,
    foldHeight: 300
  }
} satisfies MdcpConfig

export function getClientBundleIcons(codeIconMap: Record<string, string>): string[] {
  return ['lucide:copy', 'lucide:check', ...new Set(Object.values(codeIconMap))]
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    mdcp?: MdcpConfig
  }
}
