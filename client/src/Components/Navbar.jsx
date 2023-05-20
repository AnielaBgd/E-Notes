import React, { useState } from 'react'
import '../Styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  const logout = (e) => {
    e.preventDefault()
    axios.post('/auth/logout')     
    .then(response => {
     navigate("/")  
    })
  }

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
          
          <Link onClick={logout} className="Link">
            <span>Log Out</span>
          </Link>
        </div> 
      </div>
    </>
  )
}

export default Navbar
