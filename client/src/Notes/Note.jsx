import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import parse from 'html-react-parser'
import axios from 'axios'

const Note = () => {
    const params = useParams();
    const [note, setNote] = useState({})

    useEffect(() => {
        if (params.id)
        {const fetchData = async () => {
            try{
                const res = await axios.get(`/notes/get-note/${params.id}`);
                console.log(res.data[0])
                setNote(res.data[0])
            } catch (err) {
              console.log(err);
            }
          };
        fetchData();}
    }, [params.id])

  return (
    <div className='container'>
        <Navbar />
        <div className='main-content'>
        <div className='assistant-button'> 
            <Link to="/notes"> 
                <i className='fa fa-arrow-left'>Go back</i>
            </Link>
        </div>
        <div className='note-container'>
          <h1>Title: {note.note_title}</h1>
          <hr />
          <h2 className='notebook-name'>Notebook name: {note.notebook_title}</h2>
          <hr />
          <div className='note-content'>
            <p>{parse(String(note.note_content))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note
