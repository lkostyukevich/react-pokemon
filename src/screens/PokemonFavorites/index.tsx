import './style.css'
import { Header } from '../../components/Header'
import favorites_selected from '../../assets/pokemonList/favorites_selected.svg'
import comparison from '../../assets/pokemonList/comparison-icon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { removeFavoritePokemon } from '../../store/favorites/slice'

export const PokemonFavorites = () => {
  const { favorites } = useSelector((state: RootState) => state.favorites)
  const dispatch = useDispatch<AppDispatch>()

  const getPokemonId = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }

  return (
    <div className="favorites_page_container">
      <Header />
      <main className="favorites_main_content">
        <div className="pokemon_vertical_list">
          {favorites.length > 0 ? (
            <div className="pokemon_vertical_list">
              {favorites.map((pokemon) => {
                const pokemonId = getPokemonId(pokemon.url)
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
                        <button className="icon_button" title="Add to comparison">
                          <img src={comparison} className="comparison" alt="Compare" />
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
