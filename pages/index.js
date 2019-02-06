import React, { Component } from "react";
import lotteryA from "../lottery";
import web3 from "../web3";

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: "",
      participate_amount: "0.5",
      message: ""
    };
  }
  async componentDidMount() {
    // get the public addres of the manager
    const manager = await lotteryA.methods.manager().call();
    console.log("Manager is: ", manager);
    this.setState({ manager: manager });
    console.log("Manager from state valiable is: ", this.state.manager);
  }

  render() {
    return (
      <div>
        <h1>Total lottery pool is 1000 </h1>
        <form>
          <input placceholder="0.5" />
          <button type="submit">Participate</button>
        </form>
        <hr /> <br /> <hr />
        <p>
          The manager of the lottery decentralaized app is {this.state.manager}
        </p>
        <button> Pick Winner </button>
      </div>
    );
  }
}

export default Lottery;
