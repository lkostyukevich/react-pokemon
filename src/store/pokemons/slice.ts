import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type PokemonsState = {
  pokemons: {
    count: number
    next: string
    previous: string
    results: Pokemon[]
  }
  pokemonDetails: {
    details: {
      name: string
      height: number
      weight: number
      stats: Stat[]
    }
    isLoading: boolean
    error: string
  }
  isLoading: boolean
  error: string
  currentPage: number
}

const initialState: PokemonsState = {
  pokemons: {
    count: 0,
    next: '',
    previous: '',
    results: []
  },
  pokemonDetails: {
    details: {
      name: '',
      height: 0,
      weight: 0,
      stats: []
    },
    isLoading: false,
    error: ''
  },
  isLoading: false,
  error: '',
  currentPage: 1
}

type Pokemon = {
  name: string
  url: string
}

type Stat = {
  name: string
  value: number
}

export const getPokemonDetailsThunk = createAsyncThunk(
  'getPokemonDetailsThunk',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const data = await response.json()
      return data
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

export const getPokemonsListThunk = createAsyncThunk(
  'getPokemonsListThunk',
  async (url: string, { rejectWithValue }) => {
    try {
      const requestUrl = new URL(url)
      requestUrl.searchParams.set('limit', '20')

      const response = await fetch(requestUrl.toString())
      if (!response.ok) {
        throw new Error('Failed to fetch')
      }
      const data = await response.json()
      return data
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  }
)

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    setPokemons(state, action) {
      state.pokemons = action.payload
    },
    setPokemonDetailsLoading(state, action) {
      state.pokemonDetails.isLoading = action.payload
    },
    setPokemonDetails(state, action) {
      state.pokemonDetails = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getPokemonsListThunk.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(getPokemonsListThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.pokemons = action.payload

      const limit = 20
      let offset = 0

      if (action.payload.previous) {
        const prevUrl = new URL(action.payload.previous)
        offset = parseInt(prevUrl.searchParams.get('offset') || '0') + limit
      } else if (action.payload.next) {
        const nextUrl = new URL(action.payload.next)
        offset = parseInt(nextUrl.searchParams.get('offset') || '0') - limit
      }

      state.currentPage = Math.floor(offset / limit) + 1
    })
    builder.addCase(getPokemonsListThunk.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
    builder.addCase(getPokemonDetailsThunk.pending, (state) => {
      state.pokemonDetails.isLoading = true
      state.pokemonDetails.error = ''
    })
    builder.addCase(getPokemonDetailsThunk.fulfilled, (state, action) => {
      const pokemonData = action.payload
      state.pokemonDetails.details = {
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        stats: pokemonData.stats.map((stat: { stat: { name: string }; base_stat: number }) => ({
          name: stat.stat.name,
          value: stat.base_stat
        }))
      }
      state.pokemonDetails.isLoading = false
    })
    builder.addCase(getPokemonDetailsThunk.rejected, (state, action) => {
      state.pokemonDetails.isLoading = false
      state.pokemonDetails.error = action.payload as string
    })
  }
})

export const { setLoading, setPokemons, setPokemonDetailsLoading, setPokemonDetails } =
  pokemonsSlice.actions

export default pokemonsSlice.reducer
