import React, { useState,useContext, useEffect } from 'react'
import FavouriteNotebooks from '../Notebooks/FavoriteNotebooks.jsx'
import FavouriteNotes from '../Notes/FavouriteNotes'
import FavouriteProjects from '../Projects/FavouriteProjects'
import Navbar from '../Components/Navbar'
import '../Styles/App.css'

const Favourites = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Favourites</h1>
        <hr />
        <h2>Your favourite notebooks</h2>
        <FavouriteNotebooks />
        <hr />
        <h2>Your favourite notes</h2>
        <FavouriteNotes />
        <hr/>
        <h2>Your favourite projects</h2>
        <FavouriteProjects />
      </div> 
    </div>
  )
}

export default Favourites
