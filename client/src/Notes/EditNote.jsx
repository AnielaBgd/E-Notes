import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { AuthContext } from '../Context/authContext'
import axios from 'axios'
import parse from 'html-react-parser'
import Tiptap from '../Components/Tiptap'
import { validateRequiredInputs } from '../Components/Utils'


const EditNote = () => {
  // const [note, setNote] = useState({})
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [noteEditorContent, setNoteEditorContent] = useState('')

  const [submitted, setIsSubmitted] = useState(false)
  const [notebooks, setNotebooks] = useState([])
  const [notebook, setNotebook] = useState(null)
  const [error, setError] = useState(null)

  const params = useParams();
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchNotebooks = async () => {
      try{
        const res = await axios.get(`/notebooks/${currentUser.id}`);
        setNotebooks(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    if (params.id)
    {const fetchData = async () => {
        try{
            const res = await axios.get(`/notes/get-note/${params.id}`);
            setNoteTitle(res.data[0].note_title)
            setNoteContent(res.data[0].note_content)
        } catch (err) {
          console.log(err);
        }
      };
    
    fetchData();
    }
    fetchNotebooks();
  }, [currentUser.id, params.id]); 
  
  const handleEditorContent = (value) => {
    setNoteEditorContent(value)
  }

  const handleTitle = (e) => {
    setNoteTitle(e.target.value)
  }

  const handleNotebook = (e) => {
    setNotebook(e.target.value)
  }

  const submitNote = (e) => {
    e.preventDefault()
    let formData = [
      {
      'author': currentUser.id, 
      'notebookId': notebook,
      'noteTitle': noteTitle, 
      'noteEditorContent': noteEditorContent
      }
    ]
    setIsSubmitted(true)

    // if (!validateRequiredInputs(formData)) {
    //   setError('Please fill in all fields!')
    //   return false 
    // } else {
      formData[0].note_id = parseInt(params.id)
      console.log(formData)
      console.log(formData[0].noteEditorContent)
      axios.put('/notes/edit-note', formData) 
      .then(response => {
        //Clear form data and state
        e.target.reset()
        setNoteTitle(null)
        // setNoteContent(null)
        setNoteEditorContent(null)
        setNotebook(null)
        setError('')
        //Navigate back to notebooks
        navigate('/notes')
      })
      
      // }
    }
  

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Edit Note</h1>
        <div className='assistant-notebook'> 
          <Link to="/notes"> 
            <i className='fa fa-arrow-left'> Go back</i>
          </Link>

          <div className="editor">
            <Tiptap 
              handleEditorContent={handleEditorContent}
              submitted={submitted}
              noteContent= {noteContent}
              />
          </div>

          <form className='form-container' onSubmit={submitNote}>
            <div className='input-container'>
              <input value= {noteTitle} onChange={handleTitle} className='input-field' type="text" id="title" name="title"></input>
            </div>
            <br />

            <div className='input-container'>
              <select value={notebook} onClick={handleNotebook} className="input-field">
              {notebooks.map(notebook =>
              <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
              )};
              </select>
            </div>
            <br />

            <div className="input-container">
              <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Edit note</button>
            </div>

          </form>

      </div>
      <br />
      </div>
    </div>
  )
}

export default EditNote
