import { useState,useRef,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from './components/Create'
import MarketPlace from './pages/MarketPlace'
import { AppContext } from './Contexts/AppContexts'
import {Contract} from "ethers";
import Web3Modal, { providers } from "web3modal";

function App() {
  const Web3ModalRef = useRef();
  const [userAccount, setUserAccount] = useState(null)
  
 //provide signer or provider
 const connectWallet = async(needsigner =false)=>{
  const provider = await Web3ModalRef.current.connect();
  const web3Providers = new ethers.providers.web3Providers(provider);
  const accounts = await web3Providers.listAccounts();
  setUserAccount(accounts);
  //check if network is goerli
  const {chainId} = await web3Providers.getNetwork();
  if(chainId != 5){
    Window.alert("please connect to goerli network");
  }
  if(needsigner){
    const signer = await web3Providers.getSigner();
    return signer;
  }
  return web3Providers;

 }

 useEffect(()=>{
  Web3ModalRef.current = new Web3Modal({
    network: "goerli",
      providerOptions: {},
      disableInjectedProvider: false,
      cacheProvider:false
  });
  connectWallet();

 },[])
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
