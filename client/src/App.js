import './Styles/App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Home/Home'
import Register from './Register/Register'
import Login from './Login/Login'
import Favorites from './Favorites/Favorites'
import Settings from './Settings/Settings'
import Trash from './Trash/Trash'
import Notebooks from './Notebooks/Notebooks'
import Notes from './Notes/Notes'
import Projects from './Projects/Projects'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/trash" element={<Trash />} />

          <Route path="/notebooks" element={<Notebooks />} />
          <Route path="/notes" element={<Notes />}/>
          <Route path="/projects" element={<Projects />}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
