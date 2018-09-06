import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
// export interface IAppProps {
// }

export default class AllRequests extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: []
    };
  }

  public async componentDidMount() {
    const res = await axios.get("http://localhost:3001/reimbursement");
    this.setState({
      reimbursements: res.data
    });
  }

  public render() {
    return (
      <div>
        <h2>hello</h2>

        {this.state.reimbursements.map((reimbursement: any) => {
          return (
            <ul key={reimbursement.id}>
              <Link to={`/request/${reimbursement.id}`}>
                <li>Amount: ${reimbursement.amount}</li>
                <li>Request Description: {reimbursement.description}</li>
                <li> User Id: {reimbursement.author} </li>
                <li> Request Submitted: {reimbursement.submitted} </li>
                <li> Request Resolved: {reimbursement.resolved} </li>
                <li> Resolving Manager: {reimbursement.resolverId} </li>
                <li> Request Type: {reimbursement.typeId} </li>
                <li> Request Status: {reimbursement.statusId} </li>
              </Link>
            </ul>
          );
        })}
      </div>
    );
  }
}
