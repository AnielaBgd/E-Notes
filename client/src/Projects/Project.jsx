import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'

const Project = () => {
  const [projectTitle, setProjectTitle] = useState('')
  const [tasks, setTasks] = useState([])
  const [InitialTasks, setInitialTasks] = useState([])
  const [data, setData] = useState('')
  const params = useParams()

  console.log(params.id)

  useEffect(()=> {
    if(params.id) {
        axios.get(`/projects/get-project/${params.id}`) 
        .then((response) => {
            setProjectTitle(response.data[0].title)
        }) 
        .catch(err => console.log(err))

        const fetchTasks = async () => {
          try {
            const res = await axios.get(`/tasks/get-tasks/${params.id}`);
            setInitialTasks(res.data)
            setTasks(res.data)
          } catch (err) {
            console.log(err);
          }
        }
        fetchTasks();
    }
  }, [params.id])

  const deleteTask = (taskId) => {
    axios.delete(`/tasks/${taskId}`)
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleChange = (e) => {
    e.preventDefault()
    setData(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(data === '') {
      setTasks(InitialTasks)
      return false
    }
    if (tasks.length) {
      setTasks(tasks.filter(task => task.name.toLowerCase() === data.toLowerCase()))
    }
  }

  return (
    <div className="container">
        <Navbar />
        <div className="main-content">
        <input className='search-bar' onChange={handleChange} placeholder='Serach...' />
        <button className='search-button' onClick={handleClick}>Search</button>
            <h1>{projectTitle}</h1>
            <hr />
            <div className="assistant-button">
                <Link to="/projects"> 
                  <i className='fa fa-arrow-left'> Go back</i>
                </Link>
                <br />
                <br />
                <Link to={`/add-task/${params.id}`}> 
                  <i className='fa fa-plus'> Add task</i>
                </Link>
            </div>
            <br />
            <div className='card-container'>
              {tasks.length ? (tasks.map(task => 

                <div key={task.id} className='card-item'>
                  <p className='card-actions'> 
                    <Link to={`/edit-task/${task.id}`}>
                      <i className='fa fa-edit'></i>
                    </Link> 
                    <i onClick={() => deleteTask(task.id)} className='fa fa-trash'></i>  
                    </p>
                    <hr />
                    <h3>{task.name}</h3>
                    <br />
                    <h4>Assigned to: {task.member}</h4>
                    <br />
                    <h4>Task status: {task.status}</h4>                    
                </div>
              )) : (<p className='not-found'><i className='fa fa-info-circle'></i> No tasks added yet.</p>)}

            </div>
        </div>
      
    </div>
  )
}

export default Project
