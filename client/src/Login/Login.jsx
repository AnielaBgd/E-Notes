import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateRequiredInputs } from '../Components/Utils'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState('')

  //axios.defaults.withCredentials = true

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  } 

  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = [ 
      {'username': username},
      {'password' : password},
    ]
    
    if (!validateRequiredInputs(formData)) {
      setError('Please fill in all fields!')
      return false 
    } else { 
    axios.post('/auth/login', formData)    
    .then(response => {
        if(response.data.message === undefined) {
          //Clear form data and state
          e.target.reset()
          setUsername(null)
          setPassword(null) 
          setError('')
          // Redirect to e-notes homepage
          navigate("/")  
       } else {
        setError(response.data.message)
       } 
    }).catch(err => setError(err.message)) 
  }
  }
  

  return (
    <div className="auth-register">
      <div className="auth-register-title">
        <h1>Login</h1>
        <p>Sign in to your account</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="input-container">
          <i className="fa fa-user icon"></i>
          <input onChange={handleUsername} className="input-field" type="text" placeholder="Username" name="username" />
        </div>

        <div className="input-container">
          <i className="fa fa-key icon"></i>
          <input onChange={handlePassword} className="input-field" type="password" placeholder="Password" name="password" />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className='error'>{error}</p>} 
        <div className='register-btn-div'>
          <Link to="/register">Register New Account</Link>
        </div>
      </form>
    </div>
  )
}

export default Login