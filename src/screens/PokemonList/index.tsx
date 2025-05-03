import './style.css'
import { Header } from '../../components/Header'
import favorites from '../../assets/pokemonList/favorites-icon.svg'
import picture from '../../assets/pokemonList/main-picture.png'
import comparison from '../../assets/pokemonList/comparison-icon.svg'
import { Link } from 'react-router-dom'

const mockData = [
  {
    index: 0,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    index: 1,
    name: 'Charmander',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  },
  {
    index: 2,
    name: 'Squirtle',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'
  }
]

export const PokemonList = () => {
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
          {mockData.map((pokemon) => (
            <Link
              to={`/details/${pokemon.index}`}
              key={pokemon.index}
              className="pokemon_card_link">
              <div className="pokemon_card">
                <div className="pokemon_info">
                  <img src={pokemon.image} alt={pokemon.name} className="pokemon_image" />
                  <div className="pokemon_text">
                    <span className="pokemon_number">#{pokemon.index}</span>
                    <h4 className="pokemon_name">{pokemon.name}</h4>
                  </div>
                </div>
                <div className="pokemon_actions">
                  <button className="icon_button" title="Add to favorites">
                    <img src={favorites} alt="Favorite" />
                  </button>
                  <button className="icon_button" title="Add to comparison">
                    <img src={comparison} className="comparison" alt="Compare" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination_button" disabled>
            Previous
          </button>
          <span className="page_number">Page 1</span>
          <button className="pagination_button">Next</button>
        </div>
      </section>
    </div>
  )
}
