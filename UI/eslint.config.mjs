import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import unicorn from 'eslint-plugin-unicorn'
import sonarjs from 'eslint-plugin-sonarjs'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import promisesPlugin from 'eslint-plugin-promise'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

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
      'eslint.config.mjs',
    ],
    plugins: {
      unicorn,
      sonarjs,
      promise: promisesPlugin,
      prettier: prettierPlugin,
      import: importPlugin,
      ['react-hooks']: reactHooksPlugin,
    },
  },
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      // COMMON
      curly: ['error', 'all'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'no-multiple-empty-lines': ['error'],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'off',
      'no-console': ['error', { allow: ['warn', 'info', 'error'] }],
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id', '__typename', '__schema', '__dirname', '_global'],
          allowAfterThis: true,
        },
      ],

      // UNICORN
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            pascalCase: true,
            camelCase: true,
          },
          ignore: [
            'next-env.d.ts',
            'not-found.tsx',
            'vite(st)?.config.ts',
            'vite-environment.d.ts',
            '\\.spec.ts(x)?',
            '\\.types.ts(x)?',
            '\\.stories.ts(x)?',
            '\\.styled.ts(x)?',
            '\\.styles.ts(x)?',
          ],
        },
      ],
      'unicorn/prevent-abbreviations': [
        'error',
        {
          checkFilenames: false,
        },
      ],

      // SONAR
      'sonarjs/no-identical-functions': ['error', 5],

      // PETTIER
      'prettier/prettier': 'error',

      // IMPORT
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowLiteral: false,
          allowObject: true,
        },
      ],
      'import/no-unassigned-import': 'off',
      'import/no-unused-modules': 'error',

      // REACT
      'react-hooks/exhaustive-deps': [2],

      // PROMISES
      'promise/prefer-await-to-then': 'off',
      'promise/always-return': 'off',
      'promise/catch-or-return': [2, { allowThen: true, allowFinally: true }],
    },
  }),
]
