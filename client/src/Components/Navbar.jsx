import React, { useContext } from 'react'
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'


const Navbar = () => {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <>
      <div className="Navbar">
      <h2><i className="fa fa-user"></i> Welcome back, <strong>{currentUser?.username}</strong></h2>  

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
