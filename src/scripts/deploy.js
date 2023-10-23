// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });


const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();

  await userRegistry.deployed();

  console.log("MyContract deployed to:", await userRegistry.address);

  // Save the ABI to a file
  // const abi = UserRegistry.interface.format("json");
  // fs.writeFileSync("UserRegistryABI.json", abi);

  // const contractAbi = JSON.stringify(.interface.format(ethers.utils.FormatTypes.full));
  // fs.writeFileSync('UserRegistryABI.json', contractAbi);
  fs.writeFileSync('URContractAddress.json', JSON.stringify(await userRegistry.address));
  const contractAbi = JSON.stringify(UserRegistry.interface.fragments);
  fs.writeFileSync('UserRegistryABI.json', contractAbi);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

