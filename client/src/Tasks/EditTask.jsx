import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'

const EditTask = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [taskStatus, setTaskStatus] = useState('')
    const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']
    const [taskTitle, setTaskTitle] = useState('')
    const [memberName, setMemberName] = useState('')
    const [projectId, setProjectId] = useState([])

      useEffect(()=> {
        if(params.id) {
            axios.get(`/tasks/get-task/${params.id}`) 
            .then((response) => {
                console.log(response.data[0])
                setTaskTitle(response.data[0].name)
                setMemberName(response.data[0].member)
                setTaskStatus(response.data[0].status)
                setProjectId(response.data[0].projectId)
                console.log(response.data[0])
            }) 
            .catch(err => console.log(err))
        }
      }, [params.id])


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
            }
        ]
        formData[0].id = parseInt(params.id)
        axios.put('/tasks/edit-task', formData).then( response => {
            e.target.reset()
            navigate(`/project/${projectId}`)
        })
    }

  return (
    <div className='container'>
        <Navbar />
        <div className='main-content'>
            <h1>Edit task</h1>
            <hr />
            <div className="assistant-button">
            <Link to={`/project/${params.id}`}>
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
            </div>
            <form className='form-container' onSubmit={submitTask}>
                <div className="input-container">
                    <h4>Task name</h4>
                    <input className="input-field" value={taskTitle} onChange={handleTitle} placeholder="Task name" type="text" id="title" name="title" />
                </div>
                <br />
                <div className="input-container">
                    <h4>Assigned to</h4>
                    <input className="input-field" value={memberName} onChange={handleMember} placeholder="Member name" type="text" id="title" name="title" />
                </div>
                <br />
                <h4>Project status:</h4>
                <select className="input-field" value={taskStatus}  onChange={ (e) => {
                    setTaskStatus(e.target.value)} }>
                    {status.map( options => 
                    <option>{options}</option>)}
                </select>
                <br />
                <br />
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

export default EditTask
