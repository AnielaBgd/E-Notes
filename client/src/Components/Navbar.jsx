import React from 'react'
import '../Styles/Navbar.css'
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="Navbar">
      <h2>Welcome back, user</h2>  
      <br />
      <hr />

        <div className="Links"> 
          <Link to="/" className="Link"> Home</Link> 
          <Link to="/favorites" className="Link">Favorites</Link>
          <Link to="/settings" className="Link">Settings</Link>
          <Link to="/trash" className="Link">Trash</Link>
          
          <span className="Link">Log Out</span>
        </div> 
      </div>
    </>
  )
}

export default Navbar
