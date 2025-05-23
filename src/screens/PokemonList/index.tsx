import './style.css'
import { Header } from '../../components/Header'
import favorites_unselected from '../../assets/pokemonList/favorites-icon.svg'
import favorites_selected from '../../assets/pokemonList/favorites_selected.svg'
import picture from '../../assets/pokemonList/main-picture.png'
import comparison_icon from '../../assets/pokemonList/comparison-icon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../store'
import Skeleton from './Skeleton'
import { addFavoritePokemon, removeFavoritePokemon } from '../../store/favorites/slice'
import {
  addComparisonPokemon,
  clearComparisonError,
  removeComparisonPokemon
} from '../../store/comparison/slice'
import { Toast } from '../../components/Toast'
import { motion } from 'motion/react'
import { useGetPokemonsListQuery } from '../../services/pokemonApi'

export const PokemonList = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const { comparison, errorComparison } = useSelector((state: RootState) => state.comparison)
  const dispatch = useDispatch<AppDispatch>()

  const { data: pokemons, isLoading, error } = useGetPokemonsListQuery(currentUrl)

  useEffect(() => {
    if (errorComparison) {
      setToastMessage(errorComparison)
      setTimeout(() => {
        dispatch(clearComparisonError())
      }, 2000)
    }
  }, [errorComparison, dispatch])

  const getPokemonId = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }

  const getCurrentPage = (url: string) => {
    try {
      const u = new URL(url)
      const offset = parseInt(u.searchParams.get('offset') || '0', 10)
      return Math.floor(offset / 20) + 1
    } catch {
      return 1
    }
  }

  return (
    <div className="container">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <Header />

      <section className="main_content">
        <div className="main_container">
          <div className="main-info">
            <h1>Gotta catch 'em all!</h1>
            <a href="#pokemons" className="button">
              DISCOVER
            </a>
          </div>
          <img src={picture} alt="Main pokemon" className="main-image" />
        </div>
      </section>

      <section className="vertical_list_section" id="pokemons">
        <h2 className="list_title">Featured Pokémons</h2>
        <div className="pokemon_vertical_list">
          {isLoading ? (
            <Skeleton />
          ) : error ? (
            <div className="error_message">Error: Failed to fetch Pokémons</div>
          ) : (
            pokemons?.results.map((pokemon) => {
              const pokemonId = getPokemonId(pokemon.url)
              const isFavorite = favorites.some((fav) => fav.name === pokemon.name)
              const isCompared = comparison.some((comp) => comp.name === pokemon.name)
              return (
                <Link to={`/details/${pokemonId}`} key={pokemonId} className="pokemon_card_link">
                  <motion.div whileHover={{ translateY: -5 }} className="pokemon_card">
                    <div className="pokemon_info">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                        alt={pokemon.name}
                        className="pokemon_image"
                      />
                      <div className="pokemon_text">
                        <span className="pokemon_number">#{pokemonId}</span>
                        <h4 className="pokemon_name">{pokemon.name}</h4>
                      </div>
                    </div>
                    <div className="pokemon_actions">
                      <button
                        className="icon_button"
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch(
                            isFavorite
                              ? removeFavoritePokemon(pokemon)
                              : addFavoritePokemon(pokemon)
                          )
                        }}>
                        <img
                          src={isFavorite ? favorites_selected : favorites_unselected}
                          alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        />
                      </button>
                      <button
                        className={isCompared ? 'icon_button_selected' : 'icon_button'}
                        title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                        onClick={(e) => {
                          e.preventDefault()
                          dispatch(
                            isCompared
                              ? removeComparisonPokemon(pokemon)
                              : addComparisonPokemon(pokemon)
                          )
                        }}>
                        <img
                          src={comparison_icon}
                          className="comparison"
                          alt={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                        />
                      </button>
                    </div>
                  </motion.div>
                </Link>
              )
            })
          )}
        </div>

        <div className="pagination">
          <button
            className="pagination_button"
            onClick={() => setCurrentUrl(pokemons?.previous || '')}
            disabled={!pokemons?.previous || isLoading}>
            Previous
          </button>
          <span className="page_number">
            Page {getCurrentPage(currentUrl)} / {Math.ceil((pokemons?.count ?? 0) / 20) || 1}
          </span>
          <button
            className="pagination_button"
            onClick={() => setCurrentUrl(pokemons?.next || '')}
            disabled={!pokemons?.next || isLoading}>
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
