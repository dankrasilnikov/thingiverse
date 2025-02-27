import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
  {
    ignores: [
      'node_modules/',
      '.next/',
      '.husky/',
      'coverage/',
      'dist/',
      '*.log',
      'playwright-report/',
      '.nyc_output/',
      'test-results/',
      'junit.xml',
      'docs/',
    ],
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {},
  }),
]
