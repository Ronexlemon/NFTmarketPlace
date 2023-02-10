import React from "react";
import { useNavigate } from "react-router";

export default function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="sticky top-0 text-xs p-4 h-10 m-0 w-full bg-gray-100 border border-b-gray-500 flex justify-between">
            <div className="">
            <h2 >MarketPlace</h2>
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
            <button className= "h-5 bg-red-400 rounded  hover:text-white cursor-pointer">
                    Connect Wallet
                </button>
            </div>

        </div>
    )
}