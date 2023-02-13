import React ,{useContext,useEffect, useState}from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../Contexts/AppContexts";

export default function Navbar(){
    const [connect,setConnect] = useState(false);
    const [accountaddress,setAddress] = useState();
    const getAddress = async()=>{
        const signer =await  connectWallet(true);
        setAddress(await signer.getAddress());

    }
    const getAddressForUser = async()=>{
        const signer = await connectWallet(true);
      const address = await signer.getAddress();
      
      console.log(address);
       }
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
        <div className="sticky top-0 text-xs p-4 h-10 m-0 w-full bg-gray-100 border border-b-gray-500 flex justify-between">
            <div className="">
            <button onClick={()=>navigate("/MarketPlace")} className= "h-5 hover:bg-black hover:rounded  hover:text-white cursor-pointer">
                    MarketPlace{"user"+userAccount}
                </button>
            </div>
            <div className="flex justify-between w-1/4">
                <button onClick={()=>navigate("/")} className= "h-5 hover:bg-black hover:rounded  hover:text-white cursor-pointer">
                    Home
                </button>
                <button onClick={()=>navigate("/Create")} className= "h-5 hover:bg-black hover:rounded  hover:text-white cursor-pointer">
                    Create
                </button>
                <button className= "h-5 hover:bg-black hover:rounded  hover:text-white cursor-pointer">
                    Owned
                </button>
                
            </div>
            <div>
                { connect? <button onClick={() => getAddressForUser()} className= "h-5 bg-green-400 rounded  hover:text-white cursor-pointer">
                    Connected
                </button>: <button onClick={() => getAddressForUser()} className= "h-5 bg-red-400 rounded  hover:text-white cursor-pointer">
                    Connect Wallet
                </button>}
            
            </div>

        </div>
    )
}