import React, {useState, useContext} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validateRequiredInputs } from '../Components/Utils'
import { AuthContext } from '../Context/authContext'

const AddNotebook = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState(null)
    const [error, setError] = useState(null)
    const { currentUser } = useContext(AuthContext);

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
     
    const submitNoteBook = (e) => {
        e.preventDefault()
        let formData = [ 
            {'title': title}
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

                <div className='assistant-notebook'> 
                    <Link to="/notebooks"> 
                        <i className='fa fa-arrow-left'> Go back</i>
                    </Link>
                </div>

            <form className="form-container" onSubmit={submitNoteBook}>
                <div className="input-container">
                    <input onChange={handleTitle} className="input-field" placeholder="Notebook title..." type="text" id="title" name="title" />
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
