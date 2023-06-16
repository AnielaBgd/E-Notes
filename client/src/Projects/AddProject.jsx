import React, { useRef, useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'
import { validateRequiredInputs } from '../Components/Utils'

const AddProject = () => {
    const navigate = useNavigate()
    const [projectStatus, setProjectStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    const { currentUser } = useContext(AuthContext);

    const handleTitle = (e) => {
        setProjectTitle(e.target.value)
    }

    const handleDescription = (e) => {
        setProjectDescription(e.target.value)
    }

    const submitProject = (e) => {
        e.preventDefault()
        let formData = [
            {'title': projectTitle,
             'description': projectDescription,
             'status': projectStatus,
             'userId': currentUser.id}
        ]
        axios.post('/projects/add-project', formData).then( response => {
            e.target.reset()
            navigate('/projects')
        })
    }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Add project</h1>
        <hr />

        <div className="assistant-notebook">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        <br />

        <form className="form-container" onSubmit={submitProject}>
            <div className="input-container">
                <input className="input-field" onChange={handleTitle} placeholder="Project name" type="text" id="title" name="title" />
            </div>

            <div className="input-container">
                <input className="input-field" onChange={handleDescription} placeholder="Project description" type="text" id="title" name="description" />
            </div>

            <span>Project status:</span>
            <select className="input-field"  onChange={ (e) => {
                setProjectStatus(e.target.value)} }>
            {status.map( options => 
                <option>{options}</option>)}
            </select>
            <br />
            <br />
            <div className="input-container">
                <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add project</button>
            </div>
        </form>

    </div>
    </div>
  )
}

export default AddProject
