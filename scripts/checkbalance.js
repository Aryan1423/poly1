const { ethers } = require("hardhat");

async function checkBalance() {
    const [deployer] = await ethers.getSigners();
    const nftAddress = "0x4a387A678d112D99460352ed3Dd983dD9Ae727bE";
    const Aryan = await ethers.getContractAt("Aryan", nftAddress);

    const balance = await Aryan.balanceOf(deployer.address);
    console.log(`NFT balance on Amoy: ${balance.toString()}`);
}

checkBalance()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
