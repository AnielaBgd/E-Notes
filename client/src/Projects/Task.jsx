import React, { useState } from 'react'

const Task = () => {
  const [value, setValue] = useState('')
  const status = ['NOT STARTED', 'IN PROGRESS', 'COMPLETED']

  return (
    <div>
    <form className="form-container">
        <div className="input-container">
            <input className="input-field" placeholder="Task name" type="text" name="title" />
        </div>
        <br />
        <div className="input-container">
            <input className="input-field" placeholder="Assigned to" type="text" name="title" />
        </div>

        <select className="input-field" value = {value} onChange={ (e) => setValue(e.target.value) }>
        {status.map( options => 
            <option>{options}</option>)
        }
        </select>

        </form>
    </div>
  )
}

export default Task
