import React from 'react'
import Logo from '../logo.svg';
import '../Styles/Header.css'
import { Link } from 'react-router-dom';

const Header = (props) => { 
  return (
    <header>
        <Link className="logo" to="/"> 
          <img width="25" src={Logo} alt="E-Notes Logo" />
          <span>E-Notes</span>
        </Link>

      <div className="description"> 
        <Link to="/notebooks" className="link">Notebooks</Link>
        <Link to="/notes" className="link">Notes</Link>
        <Link to="/projects" className="link">Projects</Link>
      </div>
    </header>
  )
}

export default Header