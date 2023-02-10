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

    uint256 listprice = 0.01 ether;

    constructor() ERC721("NFTmarketplace", "NFTM") {
        owner = payable(msg.sender);
    }

    struct ListedTokens {
        uint256 tokenid;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlylisted;
    }
    mapping(uint256 => ListedTokens) private idToListedToken;

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "only owner can change price");
        listprice = _listPrice;
    }

    function getListPrice() public view returns (uint256) {
        return listprice;
    }

    function getLatestIdToListedToken()
        public
        view
        returns (ListedTokens memory)
    {
        uint256 currentTokenId = _tokenid.current();
        return idToListedToken[currentTokenId];
    }

    function getListedForTokenId(
        uint256 tokenid
    ) public view returns (ListedTokens memory) {
        return idToListedToken[tokenid];
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenid.current();
    }

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint) {
        require(msg.value == listprice, "send enough ether to list");
        require(price > 0, "provide the right amount");
        _tokenid.increment();
        uint currentTokenId = _tokenid.current();
        _safeMint(msg.sender, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);
        createListedToken(currentTokenId, price);
        return currentTokenId;
    }

    function createListedToken(uint256 tokenid, uint256 price) private {
        idToListedToken[tokenid] = ListedTokens(
            tokenid,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );
        _transfer(msg.sender, address(this), tokenid);
    }

    function getAllNFTS() public view returns (ListedTokens[] memory) {
        uint nftcount = _tokenid.current();
        ListedTokens[] memory tokens = new ListedTokens[](nftcount);
        uint currentIndex = 0;
        for (uint i = 0; i < nftcount; i++) {
            uint currentId = i + 1;
            ListedTokens storage currentItem = idToListedToken[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return tokens;
    }

    function getMyNFTS() public view returns (ListedTokens[] memory) {
        uint totalItemCount = _tokenid.current();
        uint itemCount =0;
        uint currentIndex = 0;
        for(uint i=0;i <totalItemCount ; i++){
            if(idToListedToken[i+1].owner==msg.sender || idToListedToken[i+1].seller == msg.sender){
                itemCount +=1;
            }
        }
        ListedTokens[] memory items = new ListedTokens[](itemCount);
        
        for (uint i = 0; i < itemCount; i++) {
            if(idToListedToken[i+1].owner==msg.sender || idToListedToken[i+1].seller == msg.sender){
               
            
            uint currentId = i + 1;
            ListedTokens storage currentItem = idToListedToken[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
            }
        }
        return items;
    }
}
