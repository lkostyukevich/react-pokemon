import { Link } from 'react-router-dom'
import logo from '../../assets/pokemonList/pokemon-logo.svg'
import './style.css'

export const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <Link to={'/'} className="header_logo">
          <img src={logo} alt="Pokemon" className="header_logo_img" />
        </Link>
        <nav className="header_menu">
          <ul>
            <li>
              <Link to={'/favorites'}>FAVORITES</Link>
            </li>
            <li>
              <Link to={'/comparison'}>COMPARISON</Link>
            </li>
          </ul>
        </nav>
        <div className="header_dots">
          <span className="dot pink"></span>
          <span className="dot yellow"></span>
          <span className="dot purple"></span>
        </div>
      </div>
    </header>
  )
}
