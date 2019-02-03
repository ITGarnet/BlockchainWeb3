const path = require("path");
const fs = require("fs");
const solc = require("solc");

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
        "*": ["*"]
      }
    }
  }
};

const buildPath = path.resolve(__dirname, "build");
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach(err => {
    console.log(err.formattedMessage);
  });
}

console.log(output.contracts["lottery.sol"].LotteryA);

/*else {
    const contracts = output.contracts["lottery.sol"];
    for (let contractName in contracts) {
        const contract = contracts[contractName];
        fs.writeFileSync(path.resolve(buildPath, `${contractName}.json`), 
        JSON.stringify(contract.abi, null, 2), 'utf8');
    }
}
*/
