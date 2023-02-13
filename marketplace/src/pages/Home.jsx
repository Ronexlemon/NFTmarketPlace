
import Create from "../components/Create";
import Navbar from "../components/Navbar";
import React ,{useContext,useEffect}from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../Contexts/AppContexts";
export default function Home(){
    const{
        Contract,
        connectWallet,
        userAccount,
        nftMarketPlaceContract,
        marketPlaceAbi,
    } = useContext(AppContext);
    const navigate = useNavigate();
    useEffect(()=>{

    },[])

    return(
        <div className="h-screen  w-full bg-black text-white flex justify-center">
            
            <Create/>
           
            

        </div>
    )
}