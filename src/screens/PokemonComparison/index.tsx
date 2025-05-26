import './style.css'
import { Header } from '../../components/Header'
import removeIcon from '../../assets/pokemonList/remove.svg'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { getPokemonComparisonThunk, removeComparisonPokemon } from '../../store/comparison/slice'
import { useEffect } from 'react'
import { motion } from 'motion/react'
import { getPokemonId } from '../../utils'

export const PokemonComparison = () => {
  const { comparison } = useSelector((state: RootState) => state.comparison)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    comparison.forEach((pokemon) => {
      if (!pokemon.height || !pokemon.weight) {
        const pokemonId = getPokemonId(pokemon.url)
        dispatch(getPokemonComparisonThunk(pokemonId))
      }
    })
  }, [comparison, dispatch])

  return (
    <div className="comparison_page_container">
      <Header />
      <main className="comparison_main_content">
        {comparison.length > 0 ? (
          <div className="pokemon_comparison_list">
            {comparison.map((pokemon) => {
              const pokemonId = getPokemonId(pokemon.url)
              return (
                <div key={pokemonId} className="comparison_card">
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="remove_button"
                    onClick={() => {
                      dispatch(removeComparisonPokemon(pokemon))
                    }}
                    title="Remove from comparison">
                    <img src={removeIcon} alt="Remove" />
                  </motion.button>
                  <div className="pokemon_image_centered">
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                      alt={pokemon.name}
                    />
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
              )
            })}
          </div>
        ) : (
          <div className="empty_comparison_message">
            <p>Comparison list is empty now...</p>
          </div>
        )}
      </main>
    </div>
  )
}
