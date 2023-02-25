// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract Web3VitePressV1 is ERC1155, Ownable, Pausable, ERC1155Supply {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;

    uint256 public createTokenPrice = 0.01 ether;
    uint256 public platformCommission = 100; // 100 / 10000 = 1%
    uint256 public platformCommissionBalance = 0;

    mapping(uint256 => string) public tokenURIMap;
    mapping(address => uint256[]) public tokenOwnByMap;
    mapping(uint256 => address) public tokenOwnerMap;
    mapping(uint256 => uint256) public tokenVaultMap;
    mapping(uint256 => uint256) public basicPriceMap;

    mapping(address => uint256) public userTotalMintCountMap; // userAddress => userTotalAmount

    event CreateToken(
        uint256 basicPrice,
        string metadataCID,
        uint256 tokenId,
        address createdBy,
        uint256 createTokenPrice
    );

    function createToken(
        uint256 basicPrice,
        string memory metadataCID
    ) public payable whenNotPaused returns (uint) {
        require(bytes(metadataCID).length > 0, "metadataCID is empty");
        require(
            msg.value >= createTokenPrice,
            "insufficient funds for createToken"
        );

        address createdBy = _msgSender();

        uint tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();

        tokenURIMap[tokenId] = metadataCID;
        tokenOwnerMap[tokenId] = createdBy;
        basicPriceMap[tokenId] = basicPrice;
        tokenOwnByMap[createdBy].push(tokenId);

        emit CreateToken(
            basicPrice,
            metadataCID,
            tokenId,
            createdBy,
            createTokenPrice
        );

        return tokenId;
    }

    function mintNFT(
        uint256 tokenId,
        uint256 amount
    ) public payable whenNotPaused {
        require(bytes(tokenURIMap[tokenId]).length > 0, "token not create yet");
        uint256 basicPrice = basicPriceMap[tokenId];
        require(
            msg.value >= basicPrice * amount,
            "insufficient funds for mintNFT"
        );
        address createdBy = _msgSender();

        _mint(createdBy, tokenId, amount, "");
        userTotalMintCountMap[createdBy] += amount;

        uint256 platformCommissionDelta = (platformCommission * msg.value) /
            10000;
        platformCommissionBalance += platformCommissionDelta;
        tokenVaultMap[tokenId] += msg.value - platformCommissionDelta;
    }

    // get all tokens
    function getTokenList(
        uint256 start,
        uint256 limit
    )
        public
        view
        returns (string[] memory tokenURIs, uint256[] memory totalMintCounts)
    {
        uint256 lens = uint256(tokenIdCounter._value - start);
        if (lens < limit) {
            limit = lens;
        }

        tokenURIs = new string[](limit);
        totalMintCounts = new uint256[](limit);

        for (uint256 i = 0; i < limit; i++) {
            tokenURIs[i] = tokenURIMap[start + i];
            totalMintCounts[i] = totalSupply(start + i);
        }
    }

    function getTokenListByOwner(
        address owner
    )
        public
        view
        returns (
            uint256[] memory tokenIds,
            string[] memory tokenURIs,
            uint256[] memory totalMintCounts
        )
    {
        uint256 lens = tokenOwnByMap[owner].length;

        tokenIds = new uint256[](lens);
        tokenURIs = new string[](lens);
        totalMintCounts = new uint256[](lens);

        for (uint256 i = 0; i < lens; i++) {
            uint256 tokenId = tokenOwnByMap[owner][i];
            tokenIds[i] = tokenId;
            tokenURIs[i] = tokenURIMap[tokenId];
            totalMintCounts[i] = totalSupply(tokenId);
        }
    }

    /* solhint-disable func-visibility */
    constructor() ERC1155("") {
        _setURI("");
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function uri(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory tokenURI = tokenURIMap[tokenId];
        return tokenURI;
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
