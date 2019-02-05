const path = require("path");
const fs = require("fs-extra");
const solc = require("solc");

const buildPath = path.resolve(__dirname, "build");
console.log(buildPath);

fs.removeSync(buildPath);

const LotteryPath = path.resolve(__dirname, "contracts", "lottery.sol");
const source = fs.readFileSync(LotteryPath, "utf8");

//console.log(solc.compile(source, 1));

var input = {
  language: "Solidity",
  sources: {
    "lottery.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        // "*": ["*"]
        "*": ["abi", "evm.bytecode.object"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

fs.ensureDirSync(buildPath);

if (output.errors) {
  output.errors.forEach(err => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts["lottery.sol"];
  for (let contractName in contracts) {
    const contract = contracts[contractName];
    console.log(contractName);
    /*
    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      //JSON.stringify(contract, null, 2),
      contract,
      "utf8"
    );
    */
    fs.outputJsonSync(
      // the seconde paramether syntax will remove the : from the name of the file
      // path.resolve(buildPath, contract.replace(":", "") + ".json"),
      path.resolve(buildPath, `${contractName}.json`),
      // the xext is the contract content for the iterated contract
      //output[contract]
      contract
    );
  }
}

//console.log(output.contracts["lottery.sol"].LotteryA);

module.export = output.contracts["lottery.sol"].LotteryA;
