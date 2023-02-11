import React from "react";

export default function Create(){

    return(
        <div className="h-full  w-full mt-4 flex justify-center">
            <div className="h-3/4 w-1/4 bg-green-100 text-purple-400 rounded overflow-hidden">
               
                <form className="p-4  grid grid-auto-rows gap-2">
               <label>Name:</label> 
               <input className="border-2" type="text" />
               <label>Description:</label>
                <input className="border-2 h-44" type="textarea" />
                <label>Price:</label> 
               <input className="border-2" type="text" placeholder="2ETH" />
               <label>Upload:</label> 
               <input className="border-2" type="file" />
               <input type="submit" value="LISTNFT" className="rounded bg-purple-500 text-white w-20 h-6"/>

                </form>


            </div>

        </div>
    )
}