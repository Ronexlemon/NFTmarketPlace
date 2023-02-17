import React,{useContext,useEffect, useState} from "react";
import { AppContext } from "../Contexts/AppContexts";
import { marketPlaceAbi } from "../components/abi/marketplaceAbi";
import axios from "axios";
import NFTTile from "./NFTTile";
import { ethers } from "ethers";
const  MarketPlace =()=>{

    // const [data, updateData] = useState(sampleData);
    // const [dataFetched, updateFetched] = useState(false);
    // const [nft,setNft] = useState(sampleData);
    const{
        Contract,
        connectWallet,
        userAccount,
        nftMarketPlaceContract,
        // marketPlaceAbi,
    
    } = useContext(AppContext);
    
    
    const sampleData = [
        {
            "name": "NFT#1",
            "description": "Alchemy's First NFT",
            "website":"http://axieinfinity.io",
            "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#2",
            "description": "Alchemy's Second NFT",
            "website":"http://axieinfinity.io",
            "image":"https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
        {
            "name": "NFT#3",
            "description": "Alchemy's Third NFT",
            "website":"http://axieinfinity.io",
            "image":"https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
            "price":"0.03ETH",
            "currentlySelling":"True",
            "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        },
    ];
    const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const provider = await connectWallet();
    const contract = new Contract(nftMarketPlaceContract, marketPlaceAbi, provider)
    let transaction = await contract.getAllNFTS();
    

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}
    
useEffect(()=>{
 getAllNFTs();
},[])
return (
    <div>
        
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}
export default MarketPlace;