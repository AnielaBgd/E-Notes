import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Notebook = () => {
  const params = useParams();  
  const [notebook, setNotebook] = useState({})

  useEffect(()=> {
    if(params.id) {
        axios.get(`/notebooks/get-notebook/${params.id}`)
        .then((response) => {
            setNotebook(response.data[0])
        }) 
        .catch(err => console.log(err))
    }
  }, [params.id])

  return (
    <div className='container'>  
      <Navbar />
      <div className='main-content'>
        <h1>{notebook.title}</h1>
        <div className='assistant-notebook'> 
            <Link to="/notebooks"> 
                <i className='fa fa-arrow-left'>Go back</i>
            </Link>
        </div>
      </div>  
    </div>
  )
}

export default Notebook