import axios from "axios";
import * as React from "react";
// import { Link } from "react-router-dom";
import { Table } from "reactstrap";

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
        <Table responsive hover>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Amount</th>
              <th>Request Description</th>
              <th>Date Request Submitted</th>
              <th>Date Request Resolved</th>
              <th>Resolving Manager</th>
              <th>Request Type</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reimbursements.map((reimbursement: any) => (
              <tr key={reimbursement.reimb_id}>
                <td> {reimbursement.ers_username} </td>
                <td>${reimbursement.reimb_amount}</td>
                <td> {reimbursement.reimb_description} </td>
                <td> {reimbursement.reimb_submitted} </td>
                <td> {reimbursement.reimb_resolved} </td>
                <td> {reimbursement.reimb_resolverId} </td>
                <td> {reimbursement.reimb_type} </td>
                <td> {reimbursement.reimb_status} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
