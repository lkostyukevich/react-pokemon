import './style.css'
import favorites_unselected from '../../assets/pokemonList/favorites-icon.svg'
import favorites_selected from '../../assets/pokemonList/favorites_selected.svg'
import comparison_icon from '../../assets/pokemonList/comparison-icon.svg'
import { Header } from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { getPokemonDetailsThunk } from '../../store/pokemons/slice'
import { useEffect, useState } from 'react'
import { addFavoritePokemon, removeFavoritePokemon } from '../../store/favorites/slice'
import {
  addComparisonPokemon,
  clearComparisonError,
  removeComparisonPokemon
} from '../../store/comparison/slice'
import { Toast } from '../../components/Toast'

export const PokemonDetails = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { pokemonId } = useParams<{ pokemonId: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { pokemonDetails } = useSelector((state: RootState) => state.pokemons)
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const { comparison, errorComparison } = useSelector((state: RootState) => state.comparison)

  useEffect(() => {
    if (pokemonId) dispatch(getPokemonDetailsThunk(pokemonId))
  }, [dispatch, pokemonId])

  useEffect(() => {
    if (errorComparison) {
      setToastMessage(errorComparison)
      setTimeout(() => {
        dispatch(clearComparisonError())
      }, 2000)
    }
  }, [errorComparison, dispatch])

  const pokemon = {
    name: pokemonDetails.details.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
  }

  const isFavorite = favorites.some((fav) => fav.name === pokemon.name)
  const isCompared = comparison.some((comp) => comp.name === pokemon.name)

  return (
    <div className="details_page_container">
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
      <Header />
      <main className="details_main_content">
        {pokemonDetails.isLoading ? (
          <div className="loading_container">
            <div className="spinner" />
          </div>
        ) : pokemonDetails.error ? (
          <div className="error_message_details">Error: {pokemonDetails.error}</div>
        ) : (
          <div className="details_card">
            <div className="left_section">
              <img
                className="poke_image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                alt={pokemonDetails.details.name}
              />
              <h1 className="poke_name">{pokemonDetails.details.name}</h1>
              <p>
                <strong>Height:</strong> {pokemonDetails.details.height}
              </p>
              <p>
                <strong>Weight:</strong> {pokemonDetails.details.weight}
              </p>
            </div>

            <div className="right_section">
              <div className="pokemon_actions_details">
                <button
                  className="icon_button"
                  title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(
                      isFavorite ? removeFavoritePokemon(pokemon) : addFavoritePokemon(pokemon)
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
                      isCompared ? removeComparisonPokemon(pokemon) : addComparisonPokemon(pokemon)
                    )
                  }}>
                  <img
                    src={comparison_icon}
                    className="comparison"
                    alt={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                  />
                </button>
              </div>
              <h2>Stats</h2>
              <ul className="stats_list">
                {pokemonDetails.details.stats.map((stat, index) => (
                  <li key={index} className="stat_item">
                    <span className="stat_name">{stat.name}</span>
                    <div className="stat_bar">
                      <div className="stat_fill" style={{ width: `${stat.value}%` }}></div>
                    </div>
                    <span className="stat_value">{stat.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
