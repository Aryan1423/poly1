const hre = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/Aryan.sol/Aryan.json");

const tokenAddress = "0xa6c2b344cf3363b0B58722392aE2B7a54585e44D";
const tokenABI = tokenContractJSON.abi;
const FxERC721RootTunnel = "0x9E688939Cb5d484e401933D850207D6750852053";
const walletAddress = "0x5F764efdbb77F98f7e1e772cbDA6dff75547096c";

async function main() {
  const tokenContract = await hre.ethers.getContractAt(tokenABI, tokenAddress);
  const fxContract = await hre.ethers.getContractAt(fxRootContractABI, FxERC721RootTunnel);

  const tokenIds = [0, 1, 2, 3, 4];

  const approveTx = await tokenContract.setApprovalForAll(FxERC721RootTunnel, true);
  await approveTx.wait();
  console.log('Approved');

  for (let i = 0; i < tokenIds.length; i++) {
    const depositTx = await fxContract.deposit(tokenAddress, walletAddress, tokenIds[i], "0x6556");
    await depositTx.wait();
    console.log(`ID ${tokenIds[i]} deposited`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});