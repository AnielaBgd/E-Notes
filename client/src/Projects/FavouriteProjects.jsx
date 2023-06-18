import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'

const FavouriteProjects = () => {
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
  
    const removeProjectFromFavourites = (e, projectId) => {
      axios.put(`/projects/add-project-to-favourite/${projectId}`)
      setProjects(projects.filter(project => project.id !== projectId))
    }
  
    return (
      <div className='container'>
        <div className='main-content'>
          <div className='card-container'>
          {projects.length ? 
          (projects.map(project =>
            <div key={project.id} className='card-item' >
              <p className='card-actions'>
                  <Link to={`/project/${project.id}`}>
                    <i className='fa fa-eye'></i>
                  </Link>
                  <span id={`project-${project.id}`} >
                    <i onClick={(e) => removeProjectFromFavourites(e, project.id)} className={`fa fa-heart ${project.is_favourite ? 'favourite' : ''}`}></i>
                  </span> 
                  <Link to={`/edit-project/${project.id}`}> 
                    <i className='fa fa-edit'></i>
                  </Link> 
                  <i onClick={() => deleteProject(project.id)} className='fa fa-trash'></i>  
                </p>
                <hr />
                <h3>{project.title}</h3>
                <hr />
                <h4>Task status: {project.status}</h4>
                <h4>Description: {project.description.length > 50 ? project.description.substring(0, 50) + ' ...' : project.description}</h4>
                <hr />
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

export default FavouriteProjects
