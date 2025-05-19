import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './pokemons/slice'
import favoritesReducer from './favorites/slice'
import comparisonReducer from './comparison/slice'

const rootReducer = {
  pokemons: pokemonsReducer,
  favorites: favoritesReducer,
  comparison: comparisonReducer
}

export const store = configureStore({
  reducer: rootReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
