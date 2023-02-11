const {ethers} = require("hardhat");
//nftMarketPlaceContractAddress: 0x05198c2783d3497361ca936a70E5643287dfD0B8
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