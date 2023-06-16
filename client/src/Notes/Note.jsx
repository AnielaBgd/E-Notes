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
            <h1>{note.note_title ? note.note_title : "" }</h1>
        <div className='assistant-notebook'> 
            <Link to="/notes"> 
                <i className='fa fa-arrow-left'>Go back</i>
            </Link>
        </div>
        <div className='note-container'>
          <hr />
          <h3>Notebook Title: {note.notebook_title}</h3>
          <br />
          <hr />
          <div className='note-content'>
            {/* <div>{typeof(note.note_content) === 'string' && parse(note.note_content)}</div> */}
            <p>{parse(String(note.note_content))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note
