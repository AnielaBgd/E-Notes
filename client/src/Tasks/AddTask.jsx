import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'

const AddTask = () => {
  return (
    <div className='container'>
        <Navbar />
        <div className='main-content'>
            <h1>Add task</h1>
            <hr />
            <div className="assistant-notebook">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        </div>
      
    </div>
  )
}

export default AddTask
