import { describe, test, expect } from 'vitest'
import { getPokemonId, getCurrentPage } from './index'

describe('Tests for utils', () => {
  describe('Tests for getPokemonId function', () => {
    test('Should return 15 with url https://pokeapi.co/api/v2/pokemon/15/ as argument', () => {
      const result = getPokemonId('https://pokeapi.co/api/v2/pokemon/15/')
      expect(result).toBe('15')
    })
  })
  describe('Tests for getCurrentPage function', () => {
    test('Should return 1 with url https://pokeapi.co/api/v2/pokemon as argument', () => {
      const result = getCurrentPage('https://pokeapi.co/api/v2/pokemon')
      expect(result).toEqual(1)
    })
    test('Should return 2 with url https://pokeapi.co/api/v2/pokemon?offset=20&limit=20 as argument', () => {
      const result = getCurrentPage('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
      expect(result).toEqual(2)
    })
    test('Should return 6 with url https://pokeapi.co/api/v2/pokemon?offset=100&limit=20 as argument', () => {
      const result = getCurrentPage('https://pokeapi.co/api/v2/pokemon?offset=100&limit=20')
      expect(result).toEqual(6)
    })
    test('Should return 1 when given an invalid URL', () => {
      const result = getCurrentPage('not-a-valid-url')
      expect(result).toEqual(1)
    })
  })
})
