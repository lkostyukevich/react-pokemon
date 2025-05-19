import './style.css'
import { Header } from '../../components/Header'
import favorites_selected from '../../assets/pokemonList/favorites_selected.svg'
import comparison_icon from '../../assets/pokemonList/comparison-icon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { removeFavoritePokemon } from '../../store/favorites/slice'
import {
  addComparisonPokemon,
  clearComparisonError,
  removeComparisonPokemon
} from '../../store/comparison/slice'
import { useEffect, useState } from 'react'
import { Toast } from '../../components/Toast'

export const PokemonFavorites = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const { comparison, errorComparison } = useSelector((state: RootState) => state.comparison)
  const dispatch = useDispatch<AppDispatch>()

  const getPokemonId = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }

  useEffect(() => {
    if (errorComparison) {
      setToastMessage(errorComparison)
      setTimeout(() => {
        dispatch(clearComparisonError())
      }, 2000)
    }
  }, [errorComparison, dispatch])

  return (
    <div className="favorites_page_container">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <Header />
      <main className="favorites_main_content">
        <div className="pokemon_vertical_list">
          {favorites.length > 0 ? (
            <div className="pokemon_vertical_list">
              {favorites.map((pokemon) => {
                const pokemonId = getPokemonId(pokemon.url)
                const isCompared = comparison.some((comp) => comp.name === pokemon.name)
                return (
                  <Link
                    to={`/details/${pokemonId}`}
                    key={pokemonId}
                    className="pokemon_card_link_fav">
                    <div className="pokemon_card_fav">
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
                          onClick={(e) => {
                            e.preventDefault()
                            dispatch(removeFavoritePokemon(pokemon))
                          }}
                          title="Remove from favorites">
                          <img src={favorites_selected} alt="Favorite" />
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
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="empty_favorites_message">
              <p>Favorites list is empty now...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
