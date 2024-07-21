# NFT Minting and Bridging Project

## Description
This project involves creating an NFT collection using the Ethereum Sepolia testnet and bridging the NFTs to the Polygon Amoy testnet. The project uses Solidity smart contracts for the NFT minting and Hardhat scripts for deployment and interaction. The NFTs are created with unique metadata and stored on IPFS, with bridging facilitated by the Polygon FxPortal.

## Getting Started

### Prerequisites
- Node.js and npm
- Git
- Hardhat
- A Gitpod account (or local development environment)
- MetaMask wallet with Sepolia testnet ETH and Amoy

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aryan1423/poly1.git
   cd poly1

# Smart Contract
## Aryan.sol
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Aryan is ERC721A, Ownable {
    uint256 public counter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => string) private _prompts;

    constructor() ERC721A("Aryan", "ARY") Ownable(msg.sender) {
        counter = 0;
        }

    function batchMintNFT(string[] memory nftURLs, string[] memory prompts) public onlyOwner {
        uint256 startTokenId = counter;
        uint256 numberOfTokens = nftURLs.length;

        _safeMint(owner(), numberOfTokens);

        for (uint256 i = 0; i < numberOfTokens; i++) {
            _tokenURIs[startTokenId + i] = nftURLs[i];
            _prompts[startTokenId + i] = prompts[i];}

        counter += numberOfTokens;}
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(tokenId < counter, "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];}

    function promptDescription(uint256 tokenId) public view returns (string memory) {
        return _prompts[tokenId];}
}
```
Deployment and Interaction Scripts
## deploy.js
This code is a JavaScript script that uses Hardhat, an Ethereum development environment, to deploy the Aryan smart contract.

Terminal code to run:
```
npx hardhat run scripts/deploy.js --network sepolia
```
```
const hre = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Aryan = await hre.ethers.deployContract("Aryan");
    await Aryan.deployed();

    console.log("Aryan deployed to:", await Aryan.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```
## mint.js
This code is a JavaScript script that uses Hardhat to interact with the Aryan contract and mint NFTs.

Terminal code to run:
```
npx hardhat run scripts/mint.js --network sepolia
```
```
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Aryan.sol/Aryan.json");
require('dotenv').config();

const tokenAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "YOUR_WALLET_ADDRESS";

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

    const nftURLs = [
        "ipfs://YOUR_IPFS_HASH_1",
        "ipfs://YOUR_IPFS_HASH_2",
        "ipfs://YOUR_IPFS_HASH_3",
        "ipfs://YOUR_IPFS_HASH_4",
        "ipfs://YOUR_IPFS_HASH_5"
    ];

    const prompts = [
        "Prompt 1",
        "Prompt 2",
        "Prompt 3",
        "Prompt 4",
        "Prompt 5"
    ];

    const tx = await token.batchMintNFT(nftURLs, prompts);
    await tx.wait();
    console.log(`Minted ${nftURLs.length} NFTs`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```
## approve.js
This code is a JavaScript script that uses Hardhat to approve the FxRoot contract to transfer the NFTs on behalf of the owner.

Terminal code to run:
```
npx hardhat run scripts/approve.js --network sepolia
```
```
const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    const nftAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    const bridgeAddress = "0xxxx"; // FxRoot contract address

    const Aryan = await ethers.getContractAt("Aryan", nftAddress);

    for (let tokenId = 0; tokenId < 5; tokenId++) {
        const tx = await Aryan.approve(bridgeAddress, tokenId);
        await tx.wait();
        console.log(`Approved NFT ${tokenId} for transfer to the bridge`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```
## getBalance.js
This code is a JavaScript script that uses Hardhat to check the balance of an address on the Polygon network.

Terminal code to run:
```
npx hardhat run scripts/getBalance.js --network amoy
```
const { ethers } = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Aryan.sol/Aryan.json");
require('dotenv').config();

const tokenAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS_ON_AMOY";
const tokenABI = tokenContractJSON.abi;
const walletAddress = "YOUR_WALLET_ADDRESS";

async function main() {
    const token = await ethers.getContractAt(tokenABI, tokenAddress);
    console.log("You now have: " + await token.balanceOf(walletAddress) + " tokens");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
## prompt.js
```
This code is a JavaScript script that uses Hardhat to retrieve the descriptions of tokens with specific token IDs from the Aryan smart contract.

## Terminal code to run:
```
npx hardhat run scripts/prompt.js --network sepolia
```
```
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/Aryan.sol/Aryan.json");
require('dotenv').config();

const tokenAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const tokenABI = tokenContractJSON.abi;

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    for (let i = 0; i < 5; i++) {
        const desc = await token.promptDescription(i);
        console.log("TokenID- " + i + ": " + desc);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
    ```
# Conclusion

This project demonstrates the complete process of creating, minting, and bridging NFTs from Ethereum Sepolia testnet to Polygon Amoy testnet using Solidity smart contracts and Hardhat scripts. The use of IPFS for metadata storage ensures that the NFT data is decentralized and secure. By following this guide, you can deploy your own NFT collection and bridge it to Polygon, making use of the robust infrastructure provided by both Ethereum and Polygon networks.

# License
This project is licensed under the MIT License - see the LICENSE.md file for details
