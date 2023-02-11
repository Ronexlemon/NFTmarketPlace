import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from './components/Create'
import MarketPlace from './pages/MarketPlace'

function App() {
  const [count, setCount] = useState(0)
 

  return (
   
    <Router>
       <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/MarketPlace" element={<MarketPlace />} />

      <Route path="/Create" element={<Home />} />
      
    </Routes>
  </Router>
    
  )
}

export default App
