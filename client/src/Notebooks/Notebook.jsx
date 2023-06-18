import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser'

const Notebook = () => {
  const params = useParams();  
  const [notebook, setNotebook] = useState({})
  const [notes, setNotes] = useState([])

  useEffect(()=> {
    if(params.id) {
        axios.get(`/notebooks/get-notebook/${params.id}`)
        .then((response) => {
            setNotebook(response.data[0])
        }) 
        .catch(err => console.log(err))

        const fetchNotes = async () => {
          try{
            const res = await axios.get(`/notes/get-notes-for-notebook/${params.id}`);
            setNotes(res.data)
            console.log(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchNotes()
    }
  }, [params.id])

  // const fetchNotes = () => {
  //   axios.get(`/notes/get-notes-for-notebook/${params.id}`)
  //   .then((response) => {
  //       setNotes(response.data)
  //       console.log(response.data)
  //   }) 
  //   .catch(err => console.log(err))
  // }

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
        <h1>{notebook.title}</h1>
        <hr />
        <div className='assistant-button'> 
            <Link to="/notebooks"> 
                <i className='fa fa-arrow-left'>Go back</i>
            </Link>
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
        </div>
      </div>  
    </div>
  )
}

export default Notebook