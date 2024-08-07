import { describe, expect, test } from 'vitest'

import { partialParse } from '.'

describe('partialParse', () => {
  test('valid json', () => {
    expect(partialParse('{"a": 1}')).toEqual({ a: 1 })
    expect(partialParse('{"a": [{"b": null}, "foo"]}')).toEqual({
      a: [{ b: null }, 'foo']
    })
  })

  test('partial valid json', () => {
    expect(partialParse('{"a": 1')).toEqual({ a: 1 })
    expect(partialParse('{"a": [{"b": null}, "foo"')).toEqual({
      a: [{ b: null }]
    })
    expect(partialParse('{ "name": { "first": "ind", "last": "go')).toEqual({
      name: { first: 'ind' }
    })
    expect(partialParse('{ "foo": true, ')).toEqual({ foo: true })
    expect(partialParse('{')).toEqual({})
    expect(partialParse('{"foo')).toEqual({})
  })

  test('invalid json', () => {
    expect(() => partialParse('')).toThrow()
    expect(() => partialParse('"foo')).toThrow()
    expect(() => partialParse('{}{')).toThrow()
  })
})
