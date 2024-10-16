import { describe, expect, test } from 'vitest'

import { partialParse } from '.'

const fixtures = {
  'package.json': {
    name: '@fake-org-name/abc-xyz',
    version: '0.0.1',
    main: 'dist/index.js',
    module: 'dist/index.mjs',
    files: ['dist'],
    bin: {
      ai: 'dist/bin/cli.js'
    },
    scripts: {
      eslint: 'npx eslint --ext .ts .',
      test: "ts-mocha -r esbuild-register 'test/**/*.ts'",
      tsup: 'npx tsup'
    },
    dependencies: {
      '@anthropic-ai/sdk': '^0.24.3',
      '@fake-org-name/abc-xyz-001': 'workspace:*',
      '@paralleldrive/cuid2': '^2.2.2',
      '@xenova/transformers': '^2.17.2',
      ajv: '^8.16.0',
      'ajv-formats': '^3.0.1',
      'ansi-colors': '^4.1.3',
      archy: '^1.0.0',
      boxen: '^7.1.1',
      clipboardy: '^4.0.0',
      diff: '^5.2.0',
      dotenv: '^16.4.5',
      'emit-keypress': '^0.0.3',
      enquirer: '^2.4.1',
      glob: '^10.4.2',
      'gpt-3-encoder': '^1.1.4',
      'groq-sdk': '^0.5.0',
      'is-glob': '^4.0.3',
      'kind-of': '^6.0.3',
      'log-update': '^6.0.0',
      mathjs: '^13.0.1',
      minimist: '^1.2.8',
      openai: '^4.52.1',
      ora: '^8.0.1',
      picomatch: '^4.0.2',
      'python-ast': '^0.1.0',
      yaml: '^2.4.5'
    },
    devDependencies: {
      '@ai-sdk/openai': '^0.0.33',
      '@types/node': '^20.14.9',
      ai: '^3.2.10',
      'esbuild-register': '^3.5.0',
      eslint: '^8.57.0',
      'gulp-format-md': '^2.0.0',
      'ts-mocha': '^10.0.0',
      'ts-node': '^10.9.2',
      'tsconfig-paths': '^4.2.0',
      tsup: '^8.1.0',
      typescript: '^5.5.2'
    }
  },

  tsconfig: {
    compilerOptions: {
      baseUrl: '.',
      whatever: null,
      allowJs: true,
      allowSyntheticDefaultImports: true,
      checkJs: false,
      esModuleInterop: true,
      isolatedModules: true,
      moduleResolution: 'NodeNext',
      module: 'NodeNext',
      noEmit: true,
      forceConsistentCasingInFileNames: true,
      lib: ['ES2022'],
      resolveJsonModule: true,
      strict: true,
      target: 'ES2022',
      types: ['node'],
      paths: { '~/*': ['src/*'] }
    },
    'ts-node': {
      transpileOnly: true
    },
    include: ['**/*.ts'],
    exclude: [
      'node_modules',
      'build',
      'public',
      'dist',
      'tmp',
      'temp',
      false,
      null,
      true,
      0.1,
      0x1,
      0b1,
      0o1,
      1e1
    ]
  },

  user: {
    name: 'Jon',
    age: 30.5,
    foo: true,
    bar: false,
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL'
    },
    phone: '555-555-5555',
    keywords: ['This is "Great!"', 'bar: "baz"', 'qux']
  }
}

describe('partialParse', () => {
  test('valid json', () => {
    // expect(partialParse('{"a": 1}')).toEqual({ a: 1 })
    expect(partialParse('{"a": [{"b": null}, "foo"]}')).toEqual({
      a: [{ b: null }, 'foo']
    })
  })

  test('partial valid json', () => {
    // expect(partialParse('{"a": 1')).toEqual({ a: 1 })
    expect(partialParse('"foo')).toEqual('foo')
    expect(partialParse('{"a": [{"b": null}, "foo"')).toEqual({
      a: [{ b: null }, 'foo']
    })
    expect(partialParse('{ "name": { "first": "ind", "last": "go')).toEqual({
      name: { first: 'ind', last: 'go' }
    })
    expect(partialParse('{ "foo": true, ')).toEqual({ foo: true })
    expect(partialParse('{')).toEqual({})
    expect(partialParse('{"foo')).toEqual({})
  })

  test('invalid json', () => {
    expect(() => partialParse('')).toThrow()
    expect(() => partialParse(';')).toThrow()
    // expect(() => partialParse('{}{')).toThrow()
  })
})

for (const [key, fixture] of Object.entries(fixtures)) {
  describe(`partialParse fixture "${key}"`, () => {
    const stringifiedFixture = JSON.stringify(fixture, null, 1)
    for (let i = 0; i < stringifiedFixture.length; i++) {
      test(`should parse "${key}" JSON string at index ${i}`, () => {
        const input = stringifiedFixture.slice(0, i + 1)
        const result = partialParse(input)
        expect(result).toBeTruthy()

        if (i >= stringifiedFixture.length - 2) {
          expect(result).toEqual(fixture)
        }
      })
    }
  })
}
