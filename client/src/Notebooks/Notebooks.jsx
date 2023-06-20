import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/authContext'
import axios from 'axios'

const Notebooks = () => {
  const [notebooks, setNotebooks] = useState([])
  const [initialNotebooks, setInitialNotebooks] = useState([])
  const [data, setData] = useState('')
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/notebooks/${currentUser.id}`);
        setInitialNotebooks(res.data)
        setNotebooks(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [currentUser.id])

  const handleChange = (e) => {
    e.preventDefault()
    setData(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(data === '') {
     setNotebooks(initialNotebooks)
     return false
    }
    if (notebooks.length) {
      setNotebooks(notebooks.filter(notebook => notebook.title.toLowerCase() === data.toLowerCase()))
    }
  }

  const addNotebookToFavourite = (e, notebookId) => { 
    axios.put(`/notebooks/add-notebook-to-favourite/${notebookId}`)

    if(!e.target.classList.contains("favourite")) {
      e.target.classList.add("favourite") 
    } else {
      e.target.classList.remove("favourite")
    }
  }

  const deleteNotebook = (notebookId) => { 
    console.log(notebookId)
    axios.delete(`/notebooks/${notebookId}`)
    setNotebooks(notebooks.filter(notebook => notebook.id !== notebookId))
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <input className='search-bar' onChange={handleChange} placeholder='Serach...' />
        <button className='search-button' onClick={handleClick}>Search</button>
        <h1>Your notebooks</h1>
        <hr />
        <div className='assistant-button'> 
          <Link to="/add-notebook"> 
            <i className='fa fa-plus'>Add notebook</i>
          </Link>
        </div>
        <h3>To access the notes of each notebook, click on the eye icon</h3>
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
                  <i onClick={(e) => addNotebookToFavourite(e, notebook.id)} className={`fa fa-heart ${notebook.is_favourite ? 'favourite' : ''}`}></i>
                </span> 

                <Link to={`/edit-notebook/${notebook.id}`}> 
                  <i className='fa fa-edit'></i>
                </Link> 
                <i onClick={() => deleteNotebook(notebook.id)} className='fa fa-trash'></i> 
              </p>
              <hr />
              <h3 className='card-title'>{notebook.title}</h3>
              <hr />
              <br />
              <p>{notebook.description}</p>
              <br />
              <h4>Created at: {notebook.created_at.slice(0, 10).toString()}</h4>
              { notebook.updated_at && <h4>Updated at: {notebook.updated_at.slice(0, 10).toString()}</h4>}
            </div>
          ) 
        ) 
        : 
        (<p className='not-found'><i className='fa fa-info-circle'></i> No notebooks added yet.</p>)}
        </div>
      </div>  
    </div>
  )
}

export default Notebooks
