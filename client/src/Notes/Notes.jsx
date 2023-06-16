import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../Context/authContext'
import Navbar from '../Components/Navbar'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [toggleContent, setToggleContent] = useState(true);
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

  const makeToggleContent = (e) => {
    setToggleContent((prevState) => !prevState)
    if(toggleContent) {
      document.getElementById(e.target.parentNode.parentNode.id).style.height="100%"
    } else {
      document.getElementById(e.target.parentNode.parentNode.id).style.height="350px"
    }
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Your notes</h1>
        <div className='assistant-notebook'> 
          <Link to="/add-note"> 
            <i className='fa fa-plus'> Add note</i>
          </Link>
        </div>
        <div className='notes-container'>
        {notes.length ? (
          notes.map(note =>
            
            <div key={note.id} className='notes-item' id={`note-item-${note.id}`}>  
              <h2>#{note.note_title}</h2>
              <hr />
              <div>
              <h3>{note.notebook_title}</h3>
                <br />
                {toggleContent && note.note_content.length > 100 ? parse(note.note_content.substring(0, 200) + ' ...') : parse(note.note_content)}
              </div>
              <p className='note-actions'>
                {note.note_content.length > 200 ? 
                (<button onClick={(e) => makeToggleContent(e)} className='login-btn'>
                  {toggleContent ? 'Show More' : 'Show less'}
                </button>)
                : ('')  
                }
                <span className='note-actions-items'>
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
                </span> 
              </p>
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
