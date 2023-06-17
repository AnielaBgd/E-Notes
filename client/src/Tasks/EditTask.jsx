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

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try{
    //         console.log(params.id)
    //         const res = await axios.get(`/tasks/get-task/${params.id}`);
    //         setTaskTitle(res.data[0].title)
    //         console.log(res.data[0])
    //       } catch (err) {
    //         console.log(err);
    //       }
    //     };
    //     fetchData();
    //   }, [params.id]);

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
            <div className="assistant-notebook">
            <Link to={`/project/${params.id}`}>
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
            <form className='form-container' onSubmit={submitTask}>
                <div className="input-container">
                    <input className="input-field" value={taskTitle} onChange={handleTitle} placeholder="Task name" type="text" id="title" name="title" />
                </div>
                <br />
                <div className="input-container">
                    <input className="input-field" value={memberName} onChange={handleMember} placeholder="Member name" type="text" id="title" name="title" />
                </div>
                <span>Project status:</span>
                <select className="input-field" value={taskStatus}  onChange={ (e) => {
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
      
    </div>
  )
}

export default EditTask
