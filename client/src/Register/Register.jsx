import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateRequiredInputs } from '../Components/Utils.js'
import axios from 'axios'
import '../Styles/Authentication.css'

const Register = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)
  const [error, setError] = useState('')

 
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = [ 
      {'username': username},
      {'password' : password},
      {'email': email}
    ]
    
    if (!validateRequiredInputs(formData)) {
      setError('Please fill in all fields!')
      return false 
    } else { 
    axios.post('/auth/register', formData) 
    .then(response => {
        if(response.data.message === undefined) {
          // Clear form data and state
          e.target.reset()
          setUsername(null)
          setPassword(null)
          setEmail(null)
          setError('')
          // Redirect to login
          navigate('/login')
        } else {
          setError(response.data.message)
        }
    }).catch(err => console.log(err)) 
 }
}  
  
return (
  <div className="auth-register">
    <div className="auth-register-title">
      <h1>Register</h1>
      <p>Sign up to E-Notes</p>
    </div>
    <form onSubmit={handleSubmit}> 
      <div className="input-container">
        <i className="fa fa-user icon"></i>
        <input onChange={handleUsername} className="input-field" type="text" id="username" placeholder="Username" name="username" /> 
      </div>

      <div className="input-container">
        <i className="fa fa-key icon"></i>
        <input onChange={handlePassword} className="input-field" type="password" id="password" placeholder="Password" name="password" />
      </div>

      <div className="input-container">
        <i className="fa fa-envelope icon"></i>
        <input onChange={handleEmail} className="input-field" type="text" id="email" placeholder="Email" name="email" />
      </div>

      <button type="submit" className="register-btn">Create New Account</button>

      {error && <p className='error'>{error}</p>} 

      <span className='have-account'>Do you have an account?  
        <Link to="/login" className="link">Click here!</Link>
      </span>
    </form>
  </div>
)
}

export default Register
