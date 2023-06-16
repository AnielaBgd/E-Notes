import { useContext } from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { AuthContext } from './Context/authContext.js'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Home/Home'
import Register from './Register/Register'
import Login from './Login/Login'
import Favorites from './Favorites/Favorites'
import Settings from './Settings/Settings'
import Trash from './Trash/Trash'
import Notebooks from './Notebooks/Notebooks'
import AddNotebook from './Notebooks/AddNotebook.jsx'
import Notebook from './Notebooks/Notebook.jsx'
import EditNotebook from './Notebooks/EditNotebook.jsx'
import Notes from './Notes/Notes'
import AddNote from './Notes/AddNote.jsx'
import EditNote from "./Notes/EditNote.jsx"
import Note from "./Notes/Note.jsx"
import Projects from './Projects/Projects'
import Welcome from './Components/Welcome'
import AddProject from "./Projects/AddProject.jsx"
import './Styles/App.css'

function App() {

  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={currentUser ? <Home /> : <Welcome/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/trash" element={<Trash />} />

          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/add-notebook" element={<AddNotebook />}></Route>
          <Route path="/edit-notebook/:id" element={<EditNotebook />}></Route>
          <Route path="/notebook/:id" element={<Notebook />}></Route>

          <Route path="/notes" element={<Notes />}/>
          <Route path="/notes/:id" element={<Note />}/>
          <Route path="/edit-note/:id" element={<EditNote />}/>
          <Route path="/add-note" element={<AddNote />}/>

          <Route path="/projects" element={<Projects />}/>
          <Route path="/add-project" element={<AddProject />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
