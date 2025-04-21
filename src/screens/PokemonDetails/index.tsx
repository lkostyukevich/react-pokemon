import './style.css'
import favorites from '../../assets/pokemonList/favorites-icon.svg'
import comparison from '../../assets/pokemonList/comparison-icon.svg'
import { Header } from '../../components/Header'

const mockData = {
  name: 'Bulbasaur',
  height: 7,
  weight: 69,
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  stats: [
    { name: 'HP', value: 45 },
    { name: 'Attack', value: 49 },
    { name: 'Defense', value: 49 },
    { name: 'Speed', value: 45 }
  ]
}

export const PokemonDetails = () => {
  return (
    <div className="details_page_container">
      <Header />
      <main className="details_main_content">
        <div className="details_card">
          <div className="left_section">
            <img className="poke_image" src={mockData.image} alt={mockData.name} />
            <h1 className="poke_name">{mockData.name}</h1>
            <p>
              <strong>Height:</strong> {mockData.height}
            </p>
            <p>
              <strong>Weight:</strong> {mockData.weight}
            </p>
          </div>

          <div className="right_section">
            <div className="pokemon_actions">
              <button className="icon_button" title="Add to favorites">
                <img src={favorites} alt="Favorite" />
              </button>
              <button className="icon_button" title="Add to comparison">
                <img src={comparison} className="comparison" alt="Compare" />
              </button>
            </div>
            <h2>Stats</h2>
            <ul className="stats_list">
              {mockData.stats.map((stat, index) => (
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
      </main>
    </div>
  )
}
