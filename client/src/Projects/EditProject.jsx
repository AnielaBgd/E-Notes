import React, {useState, useEffect } from 'react'
import { Link, useNavigate , useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'

const EditProject = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [projectStatus, setProjectStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [title, setProjectTitle] = useState('')
    const [description, setProjectDescription] = useState('')
    const [error, setError] = useState(null)

    useEffect(()=> {
        if(params.id) {
            axios.get(`/projects/get-project/${params.id}`) 
            .then((response) => {
                console.log(response.data[0])
                setProjectTitle(response.data[0].title)
                setProjectDescription(response.data[0].description)
                setProjectStatus(response.data[0].status)
            }) 
            .catch(err => console.log(err))
        }
      }, [params.id])

    const handleTitle = (e) => {
        e.preventDefault()
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
            {'title': title,
             'description': description,
             'status': projectStatus
            }
        ]
        formData[0].id = parseInt(params.id)
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

        <div className="assistant-button">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        <br />

        <form className="form-container" onSubmit={submitProject}>
            <div className="input-container">
                <h4>Project name</h4>
                <input className="input-field" value={title} onChange={handleTitle} placeholder="Project name" type="text" id="title" name="title" />
            </div>
            <br />
            <div className="input-container">
                <h4>Description</h4>
                <input className="input-field" value={description} onChange={handleDescription} placeholder="Project description" type="text" id="title" name="description" />
            </div>
            <br />
            <h4>Project status:</h4>
            <select className="input-field" defaultValue={projectStatus} onChange={ (e) => {
                setProjectStatus(e.target.value)} }>
                {status.map( options => 
                <option>{options}</option>)}
            </select>
                <br />
                <br />
                <br />
                <br />
                <div className="input-container">
                    <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Edit project</button>
                </div>
                {error && <p className='error'>{error}</p>} 
        </form>
    </div>
    </div>
  )
}

export default EditProject
