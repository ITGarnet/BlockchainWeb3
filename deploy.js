const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
//const { abi, bytecode } = require("./compile.js");
const compiledLotteryA = require("./build/LotteryA.json");

let mnemonic =
  "vintage rabbit front neglect pledge uphold snack potato unhappy calm because escape";

// I am going to use "web3": "^1.0.0-beta.37" since the newer versions don't work.
// Also, by default, the HDWalletProvider will use the address of the first address
// that's generated from the mnemonic. If you pass in a specific index, it'll
// use that address instead. Currently, the HDWalletProvider manages only one
// address at a time, but it can be easily upgraded to manage (i.e., "unlock")
// multiple addresses.
// see
// 1. https://libraries.io/github/trufflesuite/truffle-hdwallet-provider
// 2. https://github.com/trufflesuite/truffle-hdwallet-provider/blob/master/index.js#L10:
// I have five accounts in meta mask. #2 will pick up the manager's one
const provider = new HDWalletProvider(
  mnemonic,
  "https://rinkeby.infura.io/v3/3be98b330a594c559da82d2ea2fdb96e",
  2
);

const web3 = new Web3(provider);

let lotteryBC = "0x" + compiledLotteryA.evm.bytecode.object;
console.log(lotteryBC);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledLotteryA.abi)
    .deploy({ data: "0x" + compiledLotteryA.evm.bytecode.object })
    .send({ gas: "2000000", from: accounts[0] });

  console.log("Contract deployed to address", result.options.address);
  //0x308cb6364ba407e9bf1b5A03886Da7B74dF96808
};

deploy();
