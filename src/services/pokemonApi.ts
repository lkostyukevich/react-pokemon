import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Pokemon = {
  name: string
  url: string
}

type PokemonsResponse = {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (build) => ({
    getPokemonsList: build.query<PokemonsResponse, string>({
      query: (fullUrl) => {
        const urlObj = new URL(fullUrl)
        const searchParams = new URLSearchParams(urlObj.searchParams)
        searchParams.set('limit', '20')
        return `pokemon?${searchParams.toString()}`
      }
    })
  })
})

export const { useGetPokemonsListQuery } = pokemonApi
