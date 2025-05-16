import './style.css'
import { Header } from '../../components/Header'
import favorites_unselected from '../../assets/pokemonList/favorites-icon.svg'
import favorites_selected from '../../assets/pokemonList/favorites_selected.svg'
import picture from '../../assets/pokemonList/main-picture.png'
import comparison from '../../assets/pokemonList/comparison-icon.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getPokemonsListThunk } from '../../store/pokemons/slice'
import { AppDispatch, RootState } from '../../store'
import Skeleton from './Skeleton'
import { addFavoritePokemon, removeFavoritePokemon } from '../../store/favorites/slice'

export const PokemonList = () => {
  const { pokemons, isLoading, error, currentPage } = useSelector(
    (state: RootState) => state.pokemons
  )
  const { favorites } = useSelector((state: RootState) => state.favorites)

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getPokemonsListThunk('https://pokeapi.co/api/v2/pokemon'))
  }, [dispatch])

  const getPokemonId = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts[parts.length - 1]
  }

  return (
    <div className="container">
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
            <div className="error_message">Error: {error}</div>
          ) : (
            pokemons.results.map((pokemon) => {
              const pokemonId = getPokemonId(pokemon.url)
              const isFavorite = favorites.some((fav) => fav.name === pokemon.name)
              return (
                <Link to={`/details/${pokemonId}`} key={pokemonId} className="pokemon_card_link">
                  <div className="pokemon_card">
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
                      <button className="icon_button" title="Add to comparison">
                        <img src={comparison} className="comparison" alt="Compare" />
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })
          )}
        </div>

        <div className="pagination">
          <button
            className="pagination_button"
            onClick={() => dispatch(getPokemonsListThunk(pokemons.previous))}
            disabled={!pokemons.previous || isLoading}>
            Previous
          </button>
          <span className="page_number">
            Page {currentPage} / {Math.ceil(pokemons.count / 20) || 1}
          </span>
          <button
            className="pagination_button"
            onClick={() => dispatch(getPokemonsListThunk(pokemons.next))}
            disabled={!pokemons.next || isLoading}>
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
