import web3 from "./web3.js";
const address = "0x308cb6364ba407e9bf1b5A03886Da7B74dF96808";
import lotteryA from "./build/LotteryA.json";

export default new web3.eth.Contract(lotteryA.abi, address);
