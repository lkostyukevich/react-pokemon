import { createSlice } from '@reduxjs/toolkit'

type FavoritesState = {
  favorites: Favorite[]
}

const initialState: FavoritesState = {
  favorites: []
}

type Favorite = {
  url: string
  name: string
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoritePokemon(state, action) {
      const exists = state.favorites.some(pokemon => pokemon.name === action.payload.name)
      if (!exists) {
        state.favorites.push(action.payload)
      }
    },
    removeFavoritePokemon(state, action) {
      state.favorites = state.favorites.filter((favorite) => favorite.name !== action.payload.name)
    }
  }
})

export const { addFavoritePokemon, removeFavoritePokemon } = favoritesSlice.actions

export default favoritesSlice.reducer
