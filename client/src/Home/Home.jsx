import React from 'react'
import Navbar from '../Components/Navbar'

const Home = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Your recent activity</h1>
      </div> 
    </div>
  )
}

export default Home
