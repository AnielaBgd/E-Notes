import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/authContext'
import Navbar from '../Components/Navbar'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        if (currentUser.id) {
        const res = await axios.get(`/notes/get-notes/${currentUser.id}`);
        setNotes(res.data);
        console.log(res.data)
        console.log(notes);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
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
                {note.note_content.length > 200 ? parse(note.note_content.substring(0, 100) + ' ...') : parse(note.note_content)}
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
