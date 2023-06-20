import React, {useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'

const AddProject = () => {
    const navigate = useNavigate()
    const [projectStatus, setProjectStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [projectTitle, setProjectTitle] = useState('')
    const [error, setError] = useState(null)
    const [projectDescription, setProjectDescription] = useState('')

    const { currentUser } = useContext(AuthContext);

    const handleTitle = (e) => {
        setProjectTitle(e.target.value)
    }

    const handleDescription = (e) => {
        if(e.target.value.length < 200){
            setError(null)
            setProjectDescription(e.target.value)
        } else {
            setError('Please write a shorter description')
        }
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
        <h1>Plan project</h1>
        <hr />
        <div className="assistant-button">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        <br />
        <form className="form-container" onSubmit={submitProject}>
            <div className="input-container">
                <h4>Project name</h4>
                <input className="input-field" onChange={handleTitle} placeholder="Project name" type="text" id="title" name="title" />
            </div>
            <br />
            <div className="input-container">
                <h4>Description</h4>
                <textarea className="input-field" onChange={handleDescription} placeholder="Project description" type="text" id="title" name="description" />
            </div>
            <br />
            <h4>Project status:</h4>
            <select className="input-field"  onClick={ (e) => {
                setProjectStatus(e.target.value)} }>
            {status.map( options => 
                <option>{options}</option>)}
            </select>
            <br />
            <br />
            <br />
            <br />
            <div className="input-container">
                <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add project</button>
            </div>
            {error && <p className='error'>{error}</p>} 
        </form>

    </div>
    </div>
  )
}

export default AddProject
