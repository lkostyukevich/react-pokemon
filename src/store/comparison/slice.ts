import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type ComparisonState = {
  comparison: Comparison[]
  errorComparison?: string | null
}

const initialState: ComparisonState = {
  comparison: []
}

type Comparison = {
  url: string
  name: string
  height: number
  weight: number
}

export const getPokemonComparisonThunk = createAsyncThunk(
  'getPokemonComparisonThunk',
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      const data = await response.json()

      return {
        name: data.name,
        height: data.height,
        weight: data.weight,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addComparisonPokemon(state, action) {
      if (state.comparison.length >= 2) {
        state.errorComparison = 'You can only compare up to 2 Pokémon.'
        return
      }

      const exists = state.comparison.some((pokemon) => pokemon.name === action.payload.name)
      if (!exists) {
        state.comparison.push(action.payload)
        state.errorComparison = null
      }
    },
    removeComparisonPokemon(state, action) {
      state.comparison = state.comparison.filter(
        (compared) => compared.name !== action.payload.name
      )
      state.errorComparison = null
    },
    clearComparisonError: (state) => {
      state.errorComparison = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonComparisonThunk.fulfilled, (state, action) => {
      const exists = state.comparison.some((p) => p.name === action.payload.name)
      if (!exists) {
        state.comparison.push(action.payload)
      } else {
        state.comparison = state.comparison.map((p) =>
          p.name === action.payload.name
            ? { ...p, height: action.payload.height, weight: action.payload.weight }
            : p
        )
      }
    })
  }
})

export const { addComparisonPokemon, removeComparisonPokemon, clearComparisonError } = comparisonSlice.actions

export default comparisonSlice.reducer
