require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
module.exports = {
  solidity: "0.8.20",
  networks: {
      sepolia: {
          url: "https://eth-sepolia.g.alchemy.com/v2/NTspcve7ppAyDD2nb94WWUF3suw6Aah8",
          accounts: [`6806ab112638ecb619f66fc7a62d758f8bc8c23507c85162a8877a46dc534c39`]
      },
      amoy: {
        url: "https://polygon-amoy.g.alchemy.com/v2/NTspcve7ppAyDD2nb94WWUF3suw6Aah8",
        accounts: [`6806ab112638ecb619f66fc7a62d758f8bc8c23507c85162a8877a46dc534c39`]
      }
  }
};