import './style.css'
import favorites from '../../assets/pokemonList/favorites-icon.svg'
import comparison from '../../assets/pokemonList/comparison-icon.svg'
import { Header } from '../../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { useParams } from 'react-router-dom'
import { getPokemonDetailsThunk } from '../../store/pokemons/slice'
import { useEffect } from 'react'

export const PokemonDetails = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const { pokemonDetails } = useSelector((state: RootState) => state.pokemons)

  useEffect(() => {
    if (pokemonId) dispatch(getPokemonDetailsThunk(pokemonId))
  }, [dispatch, pokemonId])

  return (
    <div className="details_page_container">
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
                <button className="icon_button" title="Add to favorites">
                  <img src={favorites} alt="Favorite" />
                </button>
                <button className="icon_button" title="Add to comparison">
                  <img src={comparison} className="comparison" alt="Compare" />
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
