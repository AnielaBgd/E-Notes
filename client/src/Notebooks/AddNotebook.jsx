import React, {useState, useContext} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateRequiredInputs } from '../Components/Utils'
import { AuthContext } from '../Context/authContext'

const AddNotebook = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [error, setError] = useState(null)
    const { currentUser } = useContext(AuthContext);

    const handleTitle = (e) => {
        if (e.target.value.length < 255){
          setError(null)
          setTitle(e.target.value)
        } else {
              setError('Please write a shorter title')
          }
      }
    
      const handleDescription = (e) => {
        if (e.target.value.length < 255){
          setError(null)
          setDescription(e.target.value)
          } else {
              setError('Please write a shorter description')
          }
       }
     
    const submitNoteBook = (e) => {
        e.preventDefault()
        let formData = [ 
            {'title': title,
             'description': description}
        ]
     
        if (!validateRequiredInputs(formData)) {
           setError('Please fill in all fields!')
           return false 
        } else {
            // Get logged user
            formData[0].author = currentUser.id
            axios.post('/notebooks/create-notebook', formData) 
            .then(response => {
            //Clear form data and state
            e.target.reset()
            setTitle(null)
            setError('')
            // Navigate back to notebooks
            navigate('/notebooks')
            })
        }
    }

    return (
        <div className='container'>  
            <Navbar />
            <div className='main-content'>
                <h1>Add a new notebook</h1>
                <hr />
                <div className='assistant-button'> 
                    <Link to="/notebooks"> 
                        <i className='fa fa-arrow-left'> Go back</i>
                    </Link>
                </div>

            <form className="form-container" onSubmit={submitNoteBook}>
                <div className="input-container">
                    <input onChange={handleTitle} className="input-field" placeholder="Notebook title" type="text" id="title" name="title" />
                </div>
                <br /><div className="input-container">
                    <textarea cols="60" rows="5" onChange={handleDescription} className="input-field" placeholder="Notebook description" type="text" id="title" name="title" />
                </div>
                <br />
                <div className="input-container">
                    <button className="login-btn" type="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add notebook</button>
                </div>
                {error && <p className='error'>{error}</p>} 
            </form>
            </div> 
        </div>
    )
}

export default AddNotebook
