import logo from '../../assets/pokemonList/pokemon-logo.svg'
import './style.css'

export const Header = () => {
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo">
          <img src={logo} alt="Pokemon" className="header_logo_img" />
        </div>
        <nav className="header_menu">
          <ul>
            <li>
              <a href="#">FAVORITES</a>
            </li>
            <li>
              <a href="#">COMPARISON</a>
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
