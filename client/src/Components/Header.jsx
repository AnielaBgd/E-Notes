import React from 'react'
import Logo from '../logo.svg';
import '../Styles/Header.css'
import { Link } from 'react-router-dom';

const Header = (props) => { 
  return (
    <header>
        <Link className="Logo" to="/"> 
          <img width="25" src={Logo} alt="E-Notes Logo" />
          <span>E-Notes</span>
        </Link>

      <div className="Description"> 
        <Link to="/notebooks" className="Link">Notebooks</Link>
        <Link to="/notes" className="Link">Notes</Link>
        <Link to="/projects" className="Link">Projects</Link>
      </div>
    </header>
  )
}

export default Header