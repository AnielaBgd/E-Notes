import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const Project = () => {
  return (
    <div className="container">
        <Navbar />
        <div className="main-content">
            <h1>Your project</h1>
            <hr />
            <div className="assistant-notebook">
                <Link to="/projects"> 
                    <i className='fa fa-arrow-left'> Go back</i>
                </Link>
                <br />
                <br />
                <Link to="/add-task"> 
                <i className='fa fa-plus'> Add task</i>
                </Link>
            </div>
            <br />
        </div>
      
    </div>
  )
}

export default Project
