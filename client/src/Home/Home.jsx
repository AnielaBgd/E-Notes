import React from 'react'
import Navbar from '../Components/Navbar'
import AddQuickNote from '../Notes/AddQuickNote'

const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Write a quick note</h1>
        <AddQuickNote />
      </div> 
    </div>
  )
}

export default Home
