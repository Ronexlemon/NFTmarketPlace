import { useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from './components/Create'
import MarketPlace from './pages/MarketPlace'
import { AppContext } from './Contexts/AppContexts'
import { Provider,Contract } from 'ethers'
import Web3Modal from "web3modal";

function App() {
  const Web3ModalRef = useRef();
  const [count, setCount] = useState(0)
  
 

  return (
<AppContext.Provider value={{
  Contract

}}>
   
    <Router>
       <Navbar/>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/MarketPlace" element={<MarketPlace />} />

      <Route path="/Create" element={<Home />} />
      
    </Routes>
  </Router>
  </AppContext.Provider>
    
  )
}

export default App
