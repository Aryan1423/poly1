const tokenContractJSON = require("../artifacts/contracts/Aryan.sol/Aryan.json");
require('dotenv').config();
const { ethers } = require("hardhat");
const tokenAddress = "0xa6c2b344cf3363b0B58722392aE2B7a54585e44D"; 

async function main() {
  const nft = await ethers.getContractAt("Aryan", tokenAddress);
  const tokenURIs = [
    "ipfs://QmZkCpqexepeCUfsCgvzaqLdFGGRBLupLhiEpwVeEPneA8",
    "ipfs://QmXRiDoTvzy74bFkKLftX9oiG11mv7gahoAm4b1Zhr1Zfs",
    "ipfs://QmWhZ5FLz7J4QQYTbB7VYsZBEcdhh6Cw8nbxpzuuaa69Rf",
    "ipfs://QmRmfg1RJAhTRstQUm4ivyiEVsmKLZnQkqQkU5MnE5Qquc",
    "ipfs://QmVoJpeLVrvpaqBrWTpzHw8bf8gFZ5HU7pqMitFXPWexUz"
  ];

  const prompts = [
    "Generate an image of a Cat nft.",
    "Generate an image of an Advance Dog.",
    "Generate an image of a Cosmos.",
    "Generate an image of a Futuristic world",
    "Generate an image of an Cyborg."
  ];

  await nft.Mint(tokenURIs, prompts);
  console.log(`${tokenURIs.length} NFTs are Minted`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});