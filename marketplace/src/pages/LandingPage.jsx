import { useState } from 'react'


import Navbar from '../components/Navbar';
import Home from './Home';
import jeep from "../assets/jeep.jpeg";


export default function LandingPage() {
 

  return (
    <div className="h-screen  bg-gray-100 text-xs   ">
 
 <h1 className='flex  justify-center items-center pt-20'>The NFT MarketPlace</h1>
        <div className='w-full h-full flex justify-center  '>
            
           
        <div className='w-1/2 flex justify-between items-center'>
            <div className='rounded overflow-hidden h-40 -40'>
<img className='w-40 h-40' src={jeep} alt="No IMage"/>
            </div>
            <div className='rounded overflow-hidden h-40 -40'>
<img className='w-40 h-40' src={jeep} alt="No IMage"/>
            </div>
            <div className='rounded overflow-hidden h-40 -40'>
<img className='w-40 h-40' src={jeep} alt="No IMage"/>
            </div>
            

        </div>
        </div>
     
      
     
      
    </div>
  )
}


