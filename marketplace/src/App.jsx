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
import {  Contract,ethers} from "ethers";

import Web3Modal from "web3modal";
import Web3 from 'web3'
import {marketPlaceAbi} from "../src/components/abi/marketplaceAbi";
import {Web3Provider} from "@ethersproject/providers";

function App() {
  const nftMarketPlaceContract = "0x05198c2783d3497361ca936a70E5643287dfD0B8";
  const Web3ModalRef = useRef();
  const [userAccount, setUserAccount] = useState("");
  
 //provide signer or provider using web3\
 /**
  * 
  * @param {*} needsigner using web3 lib
  * @returns 
  *  const connectWallet = async(needsigner =false)=>{
  const provider = await Web3ModalRef.current.connect();
 
   const web3Provider = new Web3(provider);
   const account = await web3Provider.eth.getAccounts();
   setUserAccount(account);
   
 
  
  //check if network is goerli
  const chainId = await web3Provider.eth.getChainId();
  
  console.log("userAccount is", account);
  if(chainId != 5){
    alert("please connect to goerli network");
  }
  if(needsigner){
    const signer = await web3Provider.eth.getSigner();
    
    return signer;
  }
  return web3Provider;

 }
  */

const connectWallet = async (needsigner = false) => {
  const provider = await Web3ModalRef.current.connect();
  const web3Provider = new Web3Provider(provider);
  const signer = web3Provider.getSigner();
  const account = await signer.getAddress();
  setUserAccount(account);
  // check if network is goerli
  const { chainId } = await web3Provider.getNetwork();
  

  if (chainId !== 5) {
    alert("please connect to goerli network");
  }

  if (needsigner) {
    const signer = await web3Provider.getSigner();
    return signer;
  }

  return web3Provider;
};
 

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
  Web3ModalRef,



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
