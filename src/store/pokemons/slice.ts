import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type PokemonsState = {
  pokemons: {
    count: number
    next: string
    previous: string
    results: Pokemon[]
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
  isLoading: false,
  error: '',
  currentPage: 1
}

type Pokemon = {
  name: string
  url: string
}

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
  }
})

export const { setLoading, setPokemons } = pokemonsSlice.actions

export default pokemonsSlice.reducer
