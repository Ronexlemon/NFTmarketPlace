// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketPlace is ERC721URIStorage {
    address payable owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenid;
    Counters.Counter private _itemsold;

    uint256 listprice =0.01 ether;
    constructor() ERC721("NFTmarketplace", "NFTM") {
        owner = payable(msg.sender);
    }
    struct ListedTokens{
        uint256 tokenid;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlylisted;
    }
    mapping(uint256 =>ListedTokens) private idToListedToken;
    function updateListPrice(uint256 _listPrice)public payable{
        require(owner == msg.sender,"only owner can change price");
        listprice = _listPrice;
    }
    function getListPrice()public view returns(uint256){
        return listprice;
    }
    function getLatestIdToListedToken()public view returns(ListedTokens memory){
        uint256 currentTokenId = _tokenid.current();
 return idToListedToken[currentTokenId];
    }
    function getListedForTokenId(uint256 tokenid)public view returns(ListedTokens memory){
        return idToListedToken[tokenid];
    }
    function getCurrentTokenId()public view returns(uint256){
        return _tokenid.current();
    }
    
}
