import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'

const FavoriteNotebooks = () => {
    const [notebooks, setNotebooks] = useState([])
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
              const res = await axios.get(`/notebooks/get-favourites/${currentUser.id}`);
              setNotebooks(res.data)
              console.log(res.data)
            } catch (err) {
              console.log(err);
            }
          };
        fetchData();
      }, [currentUser.id]);
    
      const removeNotebookFromFavourites = (e, notebookId) => { 
        axios.put(`/notebooks/add-notebook-to-favourite/${notebookId}`)
        setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId))
      }
    
      const deleteNotebook = (notebookId) => { 
        axios.delete(`/notebooks/${notebookId}`)
        setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId))
      }

  return (
    <div className='card-container'>
        {notebooks.length  ? 
        (
          notebooks.map(notebook =>
            
            <div key={notebook.id} className='card-item'>
              <p className='card-actions'>
                <Link to={`/notebook/${notebook.id}`}>
                  <i className='fa fa-eye'></i>
                </Link>
                <span id={`notebook-${notebook.id}`} >
                  <i onClick={(e) => removeNotebookFromFavourites(e, notebook.id)} className={`fa fa-heart ${notebook.is_favourite ? 'favourite' : ''}`}></i>
                </span> 

                <Link to={`/edit-notebook/${notebook.id}`}> 
                  <i className='fa fa-edit'></i>
                </Link> 
                <i onClick={() => deleteNotebook(notebook.id)} className='fa fa-trash'></i> 
              </p>
              <hr />
              <h3>{notebook.title}</h3>
            </div>
          ) 
        ) 
        : 
        (<p className='not-found'><i className='fa fa-info-circle'></i> No notebooks added yet.</p>)}
    </div>
  )
}

export default FavoriteNotebooks
