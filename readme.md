# openai-partial-json-parser <!-- omit from toc -->

> Partial JSON parser extracted from [OpenAI's vendored version](https://github.com/openai/openai-node/tree/master/src/_vendor).

<p>
  <a href="https://github.com/transitive-bullshit/openai-partial-json-parser/actions/workflows/main.yml"><img alt="Build Status" src="https://github.com/transitive-bullshit/openai-partial-json-parser/actions/workflows/main.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/openai-partial-json-parser"><img alt="NPM" src="https://img.shields.io/npm/v/openai-partial-json-parser.svg" /></a>
  <a href="https://github.com/transitive-bullshit/openai-partial-json-parser/blob/main/license"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-blue" /></a>
  <a href="https://prettier.io"><img alt="Prettier Code Formatting" src="https://img.shields.io/badge/code_style-prettier-brightgreen.svg" /></a>
</p>

- [Intro](#intro)
- [Install](#install)
- [Usage](#usage)
- [Why?](#why)
- [License](#license)

## Intro

This package exports OpenAI's [vendored version of partial-json-parser](https://github.com/openai/openai-node/tree/master/src/_vendor/partial-json-parser) as a standalone module, which itself is a refactored version of the [original npm partial-json-parser](https://www.npmjs.com/package/partial-json-parser).

It also adds some much-needed unit tests.

This package will be kept in sync with any changes to OpenAI's vendored version.

## Install

> [!NOTE]
> This package requires `Node.js >= 18` or an equivalent environment (Bun, Deno, CF workers, etc).

```sh
npm install openai-partial-json-parser
```

## Usage

```ts
import { partialParse } from 'openai-partial-json-parser'

const json = partialParse('{ "foo": true, ')
// { foo: true }
```

## Why?

- We should be able to access OpenAI's version of `partial-json-parser` without depending on the entire `openai` package.
- OpenAI's vendored version of `partial-json-parser` doesn't have any unit tests for some reason, which could cause undesired regressions.
- We wanted a minimal, OpenAI-compatible version of `partial-json-parser` for [openai-fetch](https://github.com/dexaai/openai-fetch), [dexter](https://github.com/dexaai/dexter), and [agentic](https://github.com/transitive-bullshit/agentic).

## License

MIT © [Travis Fischer](https://x.com/transitive_bs)
