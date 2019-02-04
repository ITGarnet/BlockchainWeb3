const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

let mnemonic =
  "vintage rabbit front neglect pledge uphold snack potato unhappy calm because escape";

// I am going to use "web3": "^1.0.0-beta.37" since the newer versions don't work.
const provider = new HDWalletProvider(
  mnemonic,
  "https://mainnet.infura.io/v3/3be98b330a594c559da82d2ea2fdb96e",
  2
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);
};

deploy();
