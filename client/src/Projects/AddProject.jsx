import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Task from './Task'

const AddProject = () => {
    const [names, setNames] = useState([])
    const [optionValue, setOptionValue] = useState('')
    const [tasks, setTasks] = useState([])
    const inputRef = useRef()

    // const handleInputChange = (e) => {
    //     setInputValue(e.target.value)
    // }

    const addMember = (e) => {
        e.preventDefault()

        const value = inputRef.current.value
        if (value === "") return
        setNames(prev => {
            return [...prev, value]
        })
        inputRef.current.value = ""
    }

    const addTask = () => {
        setTasks([...tasks,  ])
    }

    // const handleTasks = (e) => {
    //     e.preventDefault()

    // }

  return (
    <div className='container'>
      <Navbar />
      <div className='main-content'>
        <h1>Add project</h1>
        <hr />

        <div className="assistant-notebook">
            <Link to="/notebooks"> 
                <i className='fa fa-arrow-left'> Go back</i>
            </Link>
        </div>
        <br />

        <form className="form-container">
        <div className="input-container">
            <input className="input-field" placeholder="Project name" type="text" id="title" name="title" />
        </div>
        <div className="input-container">
            <input className="input-field" placeholder="Project description" type="text" id="title" name="desription" />
        </div>
        <div className="input-container">
            <input className="input-field" ref={inputRef} placeholder="Member name" type="text" id="title" name="title" />
        </div>
        <button type="submit" onClick={addMember}>Add Members</button>
        <select className="input-field" value = {optionValue} onChange={ (e) => setOptionValue(e.target.value) }>
        {names.map( (name, index) => 
            <option key={index}>{name}</option>)
        }
        </select>
        <br />
        <br />
        <button type="submit" onClick={addTask}>Add Task</button>
        </form>

    </div>
    </div>
  )
}

export default AddProject
