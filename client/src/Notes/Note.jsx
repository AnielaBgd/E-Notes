import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
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

    // useEffect(()=> {
    //     if(params.id) {
    //         axios.get(`/notes/get-note/${params.id}`)
    //         .then((response) => {
    //             console.log(response.data[0])
    //             setNote(response.data[0])
    //             console.log(note)
    //         })
    //         .catch(err => console.log(err))
    //     }
    //   }, [params.id])

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
      </div>
    </div>
  )
}

export default Note
