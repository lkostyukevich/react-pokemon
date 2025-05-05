import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PokemonList } from '../screens/PokemonList'
import { PokemonFavorites } from '../screens/PokemonFavorites'
import { PokemonComparison } from '../screens/PokemonComparison'
import { PokemonDetails } from '../screens/PokemonDetails'

const router = createBrowserRouter([
  { path: '/', element: <PokemonList /> },
  { path: '/favorites', element: <PokemonFavorites /> },
  { path: '/comparison', element: <PokemonComparison /> },
  { path: '/details/:pokemonId', element: <PokemonDetails /> }
])

export const RootNavigation = () => {
  return <RouterProvider router={router} />
}
