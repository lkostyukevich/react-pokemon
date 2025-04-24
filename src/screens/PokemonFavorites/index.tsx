import './style.css'
import { Header } from '../../components/Header'
import favorites from '../../assets/pokemonList/favorites_selected.svg'
import comparison from '../../assets/pokemonList/comparison-icon.svg'

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

export const PokemonFavorites = () => {
  return (
    <div className="favorites_page_container">
      <Header />
      <main className="favorites_main_content">
        <div className="pokemon_vertical_list">
          {mockData.map((pokemon) => (
            <div
              key={pokemon.index}
              className="pokemon_card"
              onClick={() => console.log('Clicked:', pokemon.name)}>
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
          ))}
        </div>
      </main>
    </div>
  )
}
