import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../Components/Navbar'

const Project = () => {
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const params = useParams()

  console.log(params.id)

  useEffect(()=> {
    if(params.id) {
        axios.get(`/projects/get-project/${params.id}`) 
        .then((response) => {
            setProject(response.data[0])
        }) 
        .catch(err => console.log(err))

        const fetchTasks = async () => {
          try {
            const res = await axios.get(`/tasks/get-tasks/${params.id}`);
            // console.log(res.data[0])
            setTasks(res.data)
            console.log(res.data)
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
                <Link to={`/add-task/${params.id}`}> 
                  <i className='fa fa-plus'> Add task</i>
                </Link>
            </div>
            <br />
            <div className='notes-container'>
              {tasks.length ? (tasks.map(task => 

                <div key={task.id} className='notes-item'>
                  <div className='task'>
                    <label>Task name: </label>
                    <span>{task.name}</span>
                    <br />
                    <label>Assigned to:</label>
                    <span>{task.member}</span>
                    <br />
                    <label>Task status:</label>
                    <span>{task.status}</span>
                  </div>
                  <div className='note-actions'>
                    <div className='note-actions-items'> 
                      <Link to={`/edit-task/${task.id}`}>
                        <i className='fa fa-edit'></i>
                      </Link> 
                      <i onClick={() => deleteTask(task.id)} className='fa fa-trash'></i>  
                    </div> 
                  </div>
                  
                </div>
                
              )) : (<p className='not-found'><i className='fa fa-info-circle'></i> No tasks added yet.</p>)}

            </div>
        </div>
      
    </div>
  )
}

export default Project
