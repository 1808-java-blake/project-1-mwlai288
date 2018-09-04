import axios from "axios";
import * as React from "react";

export default class CreateRequests extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      requests: {
        amount: 0,
        author: 8,
        description: "",
        status: "Pending",
        type: ""
      }
    };
  }

  public onChange = (e: any) => {
    const newState = { ...this.state.requests };
    newState[e.target.name] = e.target.value;
    this.setState({ requests: newState });
  };

  public createRequest = async (e: any) => {
    e.preventDefault();
    const payload = this.state.requests;
    console.log(payload);
    try {
      const res = await axios.post(
        "http://localhost:3001/reimbursement",
        payload
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    return (
      <div>
        <h2>Submit a Reimbursement Request</h2>

        <form onSubmit={this.createRequest}>
          <input type="number" placeholder="amount" />
          <input type="text" placeholder="description" />
          <input type="text" placeholder="Lodging, Travel, Food, Other" />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}
