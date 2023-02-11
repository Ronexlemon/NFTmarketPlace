const {ethers} = require("hardhat");

async function main(){

    //get the  contract
    const NftMarketPlaceContract= await ethers.getContractFactory("NFTMarketPlace");
    //deploy contract
    const NftMarketPlaceContractDeploy  = await NftMarketPlaceContract.deploy();
    //waiting deployment
    await NftMarketPlaceContractDeploy.deployed();
    //console the address
    console.log("nftMarketPlaceContractAddress:", NftMarketPlaceContractDeploy.address);
}
//call main
main().then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})