import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateRequiredInputs } from '../Components/Utils'
import { AuthContext } from '../Context/authContext';
import '../Styles/Authentication.css'

const Login = () => {

  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState('')

  const { login } = useContext(AuthContext);

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  } 

  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = [ 
      {'username': username},
      {'password' : password},
    ]
    
    if (!validateRequiredInputs(formData)) {
      setError('Please fill in all fields!')
      return false 
     } else {
      try{
        await login(formData)
        .then(res => {
          if(res.message) {
            setError(res.message)
            return false
          }
          else {
            navigate("/")
          }
        })
      }catch(error){
        setError(error)
      } 
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