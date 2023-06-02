const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const url = process.env.SEPOLIA_RPC_URL;

  let artifacts = await hre.artifacts.readArtifact("Escrow");

  const provider = new ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.PRIVATE_KEY;

  let wallet = new ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let contract = await factory.deploy(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
  );

  console.log("contract address:", contract.address); //0xA48023A11d99E8b08A7612C1d7dDC6A7481BF035

  await contract.deployed(); //wait for it to be mined and included in a block
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
