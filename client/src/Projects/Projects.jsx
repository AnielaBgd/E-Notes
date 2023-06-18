import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

  const addProjectToFavourite = (e, projectId) => {
    axios.put(`/projects/add-project-to-favourite/${projectId}`)

    if(!e.target.classList.contains("favourite")) {
      e.target.classList.add("favourite") 
    } else {
      e.target.classList.remove("favourite")
    }
  }

  return (
    <div className='container'>
      <Navbar />

      <div className='main-content'>
        <h1>Your projects</h1>
        <hr />
        <div className="assistant-button">
          <Link to="/add-project"> 
            <i className='fa fa-plus'> Plan project</i>
          </Link>
        </div>
        <h3>To access the tasks of each project, click on the eye icon</h3>
        <div className='card-container'>
        {projects.length ? 
        (
          projects.map(project =>
            
            <div key={project.id} className='card-item' >
              <p className='card-actions'>
                  <Link to={`/project/${project.id}`}>
                    <i className='fa fa-eye'></i>
                  </Link>
                  <span id={`project-${project.id}`} >
                    <i onClick={(e) => addProjectToFavourite(e, project.id)} className={`fa fa-heart ${project.is_favourite ? 'favourite' : ''}`}></i>
                  </span> 
                  <Link to={`/edit-project/${project.id}`}> 
                    <i className='fa fa-edit'></i>
                  </Link> 
                  <i onClick={() => deleteProject(project.id)} className='fa fa-trash'></i>  
                </p> 
                <h3>{project.title}</h3>
                <hr />
                <h4>Task status: {project.status}</h4>
                <h4>Description: {project.description.length > 200 ? project.description.substring(0, 200) + ' ...' : project.description}</h4>
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
