import React from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Welcome.css'

const Welcome = () => { 
  return ( 
    <div className='welcome'>
        <div className="welcome-title">
            <h1>Welcome to <br />E-Notes</h1>
            <h3>Your personal notebook and project manager</h3> 
        </div>
       <div className="welcome-register-login"> 
            <p>Start creating your own notebooks, write notes, plan your projects
                and keep your ideas safe!
            </p>
            <div className="registration">
                <Link to="/register" className="register"> 
                    <span>Register</span>
                </Link> 
                <br />
                <Link to="/login" className="login">
                    <span>Login</span>
                </Link>
            </div>
       </div>
    </div>
  )
}

export default Welcome;