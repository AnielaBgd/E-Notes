import React, {useState, useEffect, useContext} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../Context/authContext'
import Tiptap from '../Components/Tiptap'
import '../Styles/Notes.css'

const AddNote = () => { 
  const navigate = useNavigate()  
  const [notebooks, setNotebooks] = useState([])
  const [notebook, setNoteBook] = useState(null)
  const [noteTitle, setNoteTitle] = useState('')
  const [noteEditorContent, setNoteEditorContent] = useState('')
  const [submitted, setIsSubmitted] = useState(false)

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/notebooks/${currentUser.id}`);
        setNotebooks(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.id]);


  const handleNoteBook = (e) => {
    setNoteBook(e.target.value)
  }

  const handleTitle = (e) => {
    setNoteTitle(e.target.value)
   }

  const handleEditorContent = (value) => {
    setNoteEditorContent(value)
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

    axios.post('/notes/add-note', formData) 
      .then(response => {
        //Clear form data and state
        e.target.reset()
        // Navigate back to notes
        navigate('/notes')
      })
  }

  return (
    <div className='container'>  
    <Navbar />
    <div className='main-content'>
      <h1>Add a new note</h1>

      <div className='assistant-notebook'> 
        <Link to="/notes"> 
          <i className='fa fa-arrow-left'> Go back</i>
        </Link>
      </div>
      <br />

      <div className="editor">
        <Tiptap 
          handleEditorContent={handleEditorContent}
          submitted={submitted} /> 
      </div>
 
      <form className="form-container" onSubmit={submitNote}>
          <div className="input-container">
            <input onChange={handleTitle} className="input-field" placeholder="Note title..." type="text" id="title" name="title" />
          </div>
          <br />

          <div className="input-container">
            <select onClick={handleNoteBook} className="input-field">
            {notebooks.map(notebook =>
              <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
            )};
            </select>
          </div>
          <br />

          <div className="input-container">
            <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add note</button>
          </div>
      </form>
      
    </div> 
    </div>
  )
}
 
export default AddNote
