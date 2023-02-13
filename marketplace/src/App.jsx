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
import {  Contract } from "ethers";
import Web3Modal from "web3modal";
import {marketPlaceAbi} from "../src/components/abi/marketplaceAbi";

function App() {
  const nftMarketPlaceContract = "0x05198c2783d3497361ca936a70E5643287dfD0B8";
  const Web3ModalRef = useRef();
  const [userAccount, setUserAccount] = useState();
  
 //provide signer or provider
 const connectWallet = async(needsigner =false)=>{
  const provider = await Web3ModalRef.current.connect();
  const web3Providers = new ethers.providers.web3Providers(provider);
  
  
 
  
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
  
  

 },[])
  return (
<AppContext.Provider value={{
  Contract,
  connectWallet,
  userAccount,
  nftMarketPlaceContract,
  marketPlaceAbi,



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
