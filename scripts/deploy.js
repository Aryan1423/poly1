async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Aryan = await ethers.getContractFactory("Aryan");
    const aryan = await Aryan.deploy();
    await aryan.waitForDeployment();

    console.log("Aryan deployed to:", await aryan.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
