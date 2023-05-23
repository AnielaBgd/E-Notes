import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { validateRequiredInputs } from '../Components/Utils'

const EditNotebook = () => { 
  const navigate = useNavigate()
  const params = useParams()  
  const [title, setTitle] = useState(null)
  const [error, setError] = useState(null)

  useEffect(()=> {
    if(params.id) {
        axios.get(`/notebooks/get-notebook/${params.id}`) 
        .then((response) => {
            setTitle(response.data[0].title)
        }) 
        .catch(err => console.log(err))
    }
  }, [params.id])

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
      // Also send 
      formData[0].notebook_id = parseInt(params.id)
      console.log(formData)
      axios.put('/notebooks/edit-notebook', formData) 
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
      <h1>Edit notebook</h1> 
 
      <div className='assistant-notebook'> 
        <Link to="/notebooks"> 
          <i className='fa fa-arrow-left'> Go back</i>
        </Link>
      </div>

      <form className="form-container" onSubmit={submitNoteBook}>
        <div className="input-container">
          <input value={title} onChange={handleTitle} className="input-field" type="text" id="title" name="title" />
        </div>
        <br />
        <div className="input-container">
          <button className="login-btn" type="submit"><i className="fa fa-edit" aria-hidden="true"></i> Edit notebook</button>
        </div>
        {error && <p className='error'>{error}</p>} 
      </form>
    </div> 
    </div>
  )
}

export default EditNotebook