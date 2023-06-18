import React, { useContext } from 'react'
import '../Styles/Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'


const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
      <div className="navbar">
      <h2>Welcome, {currentUser?.username}</h2>
      <br />
      <hr />
      <div className="links"> 
        <Link to="/" className="link"><i className="fa fa-home"></i> Home</Link> 
        <Link to="/favourites" className="link"><i className="fa fa-heart"></i> Favourites</Link>
        {/* <Link to="/settings" className="link"><i className="fa fa-cog"></i> Settings</Link> */}
        {/* <Link to="/trash" className="link"><i className="fa fa-trash"></i> Trash</Link> */}  
        <Link onClick={logout} to="/" className="link">
          <span><i className="fa fa-sign-out"></i> Log Out</span>
        </Link>
      </div>
      </div>
  )
}

export default Navbar
