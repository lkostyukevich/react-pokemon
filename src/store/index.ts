import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import pokemonsReducer from './pokemons/slice'
import favoritesReducer from './favorites/slice'
import comparisonReducer from './comparison/slice'
import { persistReducer, persistStore } from 'redux-persist'
import { pokemonApi } from '../services/pokemonApi'

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  favorites: favoritesReducer,
  comparison: comparisonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/FLUSH',
          'persist/PURGE',
          'persist/REGISTER'
        ]
      }
    }).concat(pokemonApi.middleware)
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
