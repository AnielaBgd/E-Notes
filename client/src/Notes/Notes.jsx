import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/authContext'
import Navbar from '../Components/Navbar'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState('')
  const [initialNotes, setInitialNotes] = useState([])
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        if (currentUser.id) {
        const res = await axios.get(`/notes/get-notes/${currentUser.id}`);
        setNotes(res.data);
        setInitialNotes(res.data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.id]);

  const deleteNote = (noteId) => { 
    axios.delete(`/notes/delete-note/${noteId}`)
    setNotes(notes.filter(note => note.id !== noteId))
  }

  const addNoteToFavourite = (e, noteId) => { 
    axios.put(`/notes/add-note-to-favourite/${noteId}`)

    if(!e.target.classList.contains("favourite")) {
      e.target.classList.add("favourite") 
    } else {
      e.target.classList.remove("favourite")
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setData(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if(data === '') {
      setNotes(initialNotes)
      return false
    }
    if (notes.length) {
      setNotes(notes.filter(note => note.note_title.toLowerCase() === data.toLowerCase()))
    }
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <input type='text' className='search-bar' onChange={handleChange} placeholder='Serach...' />
        <button onClick={handleClick} className='search-button'>Search</button>
        <h1>Your notes</h1>
        <hr />
        <div className='assistant-button'> 
          <Link to="/add-note"> 
            <i className='fa fa-plus'> Add note</i>
          </Link>
          <h3>To view a note, click on the eye icon</h3>
        </div>
        <div className='card-container'>
        {notes.length ? (
          notes.map(note =>
            <div key={note.id} className='card-item' id={`card-item-${note.id}`}>  
              <p className='card-actions'>
                <Link to={`/notes/${note.id}`}>
                  <i className='fa fa-eye'></i>
                </Link>
                <span id={`note-${note.id}`} >
                  <i onClick={(e) => addNoteToFavourite(e, note.id)} className={`fa fa-heart ${note.is_favourite ? 'favourite' : ''}`}></i>
                </span>
                <Link to={`/edit-note/${note.id}`}> 
                  <i className='fa fa-edit'></i>
                </Link> 
                <i onClick={() => deleteNote(note.id)} className='fa fa-trash'></i>
              </p>
              <h3 className='card-title'>{note.note_title}</h3>
              <hr />
              <div>
              <h3>{note.notebook_title}</h3>
              <br />
              {note.note_content.length > 200 ? parse(note.note_content.substring(0, 200) + ' ...') : parse(note.note_content)}
              <br />
              <h4>Created at: {note.created_at.slice(0, 10).toString()}</h4>
              {note.last_modified && <h4>Last modified: {note.last_modified.slice(0, 10).toString()}</h4>}
              </div>
              
            </div>
          ) 
        ) 
        : 
        (<p className='not-found'><i className='fa fa-info-circle'></i> No notes added yet.</p>)}
        <div/>
        </div>
      </div>  
    </div>
  )
}

export default Notes
