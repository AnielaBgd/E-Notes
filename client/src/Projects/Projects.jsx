import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Projects.css'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/projects/get-projects/${currentUser.id}`);
        setProjects(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.id])

  const deleteProject = (projectId) => {
    axios.delete(`/projects/${projectId}`)
    setProjects(projects.filter(project => project.id !== projectId))
  }

  return (
    <div className='container'>
      <Navbar />

      <div className='main-content'>
        <h1>Your projects</h1>
        <hr />
        <div className="assistant-notebook">
          <Link to="/add-project"> 
            <i className='fa fa-plus'> Add project</i>
          </Link>
        </div>
        <div className='notes-container'>
        {projects.length ? 
        (
          projects.map(project =>
            
            <div key={project.id} className='notes-item' >  
              <div className="project">
                <label>Project name: </label>
                <h2>{project.title}</h2>
                <hr />
                <label>Project description: </label>
                <h3>{project.description}</h3>
                <hr />
                <hr />
                <label>Task status: </label>
                <span>{project.status}</span>
                <hr />
              </div>
              <div className='note-actions'>
                <div className='note-actions-items'>
                  <Link to={`/project/${project.id}`}>
                    <i className='fa fa-eye'></i>
                  </Link>
                  <span id={`project-${project.id}`} >
                    <i className={`fa fa-heart ${project.is_favourite ? 'favourite' : ''}`}></i>
                  </span> 
                  <Link to={`/edit-project/${project.id}`}> 
                    <i className='fa fa-edit'></i>
                  </Link> 
                  <i onClick={() => deleteProject(project.id)} className='fa fa-trash'></i>  
                </div> 
              </div>
              
            </div>
          ) 
        ) 
        : 
        (<p className='not-found'><i className='fa fa-info-circle'></i> No projects added yet.</p>)}
        </div>
      </div>
    </div>
  )
}

export default Projects
