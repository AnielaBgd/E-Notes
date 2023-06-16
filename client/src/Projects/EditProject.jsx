import React, {useState, useContext, useEffect } from 'react'
import { Link, useNavigate , useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'

const EditProject = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [projectStatus, setProjectStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [projectTitle, setProjectTitle] = useState('')
    const [projectDescription, setProjectDescription] = useState('')

    useEffect(()=> {
        if(params.id) {
            axios.get(`/projects/get-project/${params.id}`) 
            .then((response) => {
                console.log(response.data[0])
                setProjectTitle(response.data[0].title)
                setProjectDescription(response.data[0].description)
                setProjectStatus(response.data[0].status)
                console.log(projectTitle)
            }) 
            .catch(err => console.log(err))
        }
      }, [params.id])

    const handleTitle = (e) => {
        setProjectTitle(e.target.value)
        // console.log(projectTitle)
    }

    const handleDescription = (e) => {
        setProjectDescription(e.target.value)
        // console.log(projectDescription)
    }

    const submitProject = (e) => {
        e.preventDefault()
        let formData = [
            {'title': projectTitle,
             'description': projectDescription,
             'status': projectStatus
            }
        ]
        formData[0].id = parseInt(params.id)
        // console.log(formData)
        axios.put('/projects/edit-project', formData).then( response => {
            e.target.reset()
            navigate('/projects')
        })
    }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Edit project</h1>
        <hr />

        <div className="assistant-notebook">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        <br />

        <form className="form-container" onSubmit={submitProject}>
            <div className="input-container">
                <input className="input-field" value={projectTitle} onChange={handleTitle} placeholder="Project name" type="text" id="title" name="title" />
            </div>

            <div className="input-container">
                <input className="input-field" value={projectDescription} onChange={handleDescription} placeholder="Project description" type="text" id="title" name="description" />
            </div>

            <span>Project status:</span>
            <select className="input-field" value={projectStatus} onChange={ (e) => {
                setProjectStatus(e.target.value)
                console.log(projectStatus)} }>
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

export default EditProject
