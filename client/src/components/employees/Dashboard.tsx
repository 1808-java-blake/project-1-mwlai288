import axios from "axios";
import * as React from "react";

export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: [],
      users: {}
    };
  }

  public async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios.get(`http://localhost:3001/users/${id}`);
    this.setState({
      reimbursements: res.data.reimbursement,
      users: res.data
    });
  }

  public render() {
    console.log(this.state.reimbursements);
    return (
      <div>
        Welcome: {this.state.users.first_name}
        <br />
        {this.state.users.username}
        's Request History:
        {this.state.reimbursements.map((reimbursement: any) => (
          <div key={reimbursement.id}>
            <p> {reimbursement.ers_username} </p>
            <p>${reimbursement.amount}</p>
            <p> {reimbursement.description} </p>
            <p> {reimbursement.submitted} </p>
            <p> {reimbursement.resolved} </p>
            <p> {reimbursement.reimb_status} </p>
          </div>
        ))}
      </div>
    );
  }
}
