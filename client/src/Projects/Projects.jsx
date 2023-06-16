import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/App.css'
import Navbar from '../Components/Navbar'

const Projects = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Your projects</h1>
        <hr />
        <div className="assistant-notebook">
          <Link to="/add-project"> 
            <i className='fa fa-plus'> Add project</i>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Projects
