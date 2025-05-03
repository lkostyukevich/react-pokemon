import './style.css'
import { Header } from '../../components/Header'
import removeIcon from '../../assets/pokemonList/remove.svg'

const mockData = [
  {
    name: 'Bulbasaur',
    height: 7,
    weight: 69,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  },
  {
    name: 'Charmander',
    height: 6,
    weight: 85,
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png'
  }
]

export const PokemonComparison = () => {
  return (
    <div className="comparison_page_container">
      <Header />
      <main className="comparison_main_content">
        <div className="pokemon_comparison_list">
          {mockData.map((pokemon, index) => (
            <div key={index} className="comparison_card">
              <button className="remove_button" title="Remove from comparison">
                <img src={removeIcon} alt="Remove" />
              </button>
              <div className="pokemon_image_centered">
                <img src={pokemon.image} alt={pokemon.name} />
              </div>
              <div className="comparison_table">
                <div className="comparison_row">
                  <span className="label">Name</span>
                  <span className="value">{pokemon.name}</span>
                </div>
                <div className="comparison_row">
                  <span className="label">Height</span>
                  <span className="value">{pokemon.height}</span>
                </div>
                <div className="comparison_row">
                  <span className="label">Weight</span>
                  <span className="value">{pokemon.weight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
