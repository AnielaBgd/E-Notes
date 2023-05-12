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
          <Link to="/" className="Link"><i className="fa fa-home"></i>Home</Link> 
          <Link to="/favorites" className="Link"><i className="fa fa-heart"></i>Favorites</Link>
          <Link to="/settings" className="Link"><i className="fa fa-cog"></i>Settings</Link>
          <Link to="/trash" className="Link"><i className="fa fa-trash"></i>Trash</Link>
          
          <span className="Link">Log Out</span>
        </div> 
      </div>
    </>
  )
}

export default Navbar
