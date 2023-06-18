import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'

const AddTask = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [taskStatus, setTaskStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [taskTitle, setTaskTitle] = useState('')
    const [memberName, setMemberName] = useState('')

    const handleTitle = (e) => {
        e.preventDefault()
        setTaskTitle(e.target.value)
    }

    const handleMember = (e) => {
        e.preventDefault()
        setMemberName(e.target.value)
    }

    const submitTask = (e) => {
        e.preventDefault()
        let formData = [
            {'name': taskTitle,
             'member': memberName,
             'status': taskStatus,
             'projectId': params.id}
        ]
        axios.post('/tasks/add-task', formData).then( response => {
            e.target.reset()
            navigate(`/project/${params.id}`)
        })
    }

  return (
    <div className='container'>
        <Navbar />
        <div className='main-content'>
            <h1>Add task</h1>
            <hr />
            <div className="assistant-button">
            <Link to="/projects"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
            </div>
            <form className='form-container' onSubmit={submitTask}>
                <div className="input-container">
                    <h4>Name</h4>
                    <input className="input-field" onChange={handleTitle} placeholder="Task name" type="text" id="title" name="title" />
                </div>
                <br />
                <div className="input-container">
                    <h4>Assigned to</h4>
                    <input className="input-field" onChange={handleMember} placeholder="Member name" type="text" id="title" name="title" />
                </div>
                <br />
                <h4>Task status:</h4>
                <select className="input-field"  onClick={ (e) => {
                setTaskStatus(e.target.value)} }>
                {status.map( options => 
                    <option>{options}</option>)}
                </select>
                <br />
                <br />
                <div className="input-container">
                    <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add task</button>
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default AddTask
