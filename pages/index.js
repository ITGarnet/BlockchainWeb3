import React, { Component } from "react";
import lotteryA from "../lottery";
import web3 from "../web3";
import lottery from "../lottery";

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
      participate_amount: "0.01",
      message: "",
      total_amount: ""
    };
  }
  async componentDidMount() {
    // get the public addres of the manager
    const manager = await lotteryA.methods.manager().call();
    console.log("Manager is: ", manager);
    this.setState({ manager: manager });
    const total_amount = await web3.eth.getBalance(lotteryA.options.address);
    this.setState({ total_amount: total_amount });
  }

  onSubmit = async event => {
    event.preventDefault(); //prevent the browser to refresh
    const accounts = await web3.eth.getAccounts(); // at this point the metamask will kick out
    if (this.state.participate_amount < 0.01) {
      return alert("Amount is less that 0.01. Please enter a bigger amount.");
    }
    this.setState({ message: "Plese wait ... " });
    const enter_lottery = await lotteryA.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.participate_amount, "ether")
    });
    this.setState({ message: "You have been added to the lottery." });
  };

  onClick = async () => {
    this.setState({ message: "Please wait ..." });
    const accounts = await web3.eth.getAccounts();
    const winner = await lotteryA.methods.pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: "Payment sent to winner" });
  };

  render() {
    return (
      <div>
        <h1>
          Total lottery pool is{" "}
          {web3.utils.fromWei(this.state.total_amount, "ether")}{" "}
        </h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.participate_amount}
            onChange={event =>
              this.setState({
                participate_amount: event.target.value
              })
            }
          />
          <button type="submit">Participate</button>
        </form>
        <p>{this.state.message}</p>
        <hr /> <br /> <hr />
        <p>
          The manager of the lottery decentralaized app is {this.state.manager}
        </p>
        <button onClick={this.onClick}> Pick Winner </button>
      </div>
    );
  }
}

export default Lottery;
