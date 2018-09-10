import axios from "axios";
import * as React from "react";
import styled from "styled-components";
import * as moment from "moment";

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
    if (this.state.reimbursements.length === 0) {
      return (
        <p>
          No reimbursement requests have been made. Your Id to create
          reimbursements is {this.state.users.id}.
        </p>
      );
    } else {
      return (
        <div>
          <Title>
            Welcome: {this.state.users.username}
            <br />
            Your Id to create reimbursements is {this.state.users.id}.<br />
            {this.state.users.username}
            's Request History:
          </Title>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <TableHeader>Amount</TableHeader>
                  <TableHeader>Request Description</TableHeader>
                  <TableHeader>Date Request Submitted</TableHeader>
                  <TableHeader>Date Request Resolved</TableHeader>
                </tr>
              </thead>
              <tbody>
                {this.state.reimbursements.map((reimbursement: any) => (
                  <tr
                    className={
                      reimbursement.reimb_status === "Approved"
                        ? "table-success"
                        : "table-danger"
                    }
                    key={reimbursement.id}
                  >
                    <TableData>$ {reimbursement.amount} </TableData>
                    <TableData> {reimbursement.description} </TableData>
                    <TableData>
                      {moment(reimbursement.submitted).format("LLLL")}
                    </TableData>
                    <TableData>
                      {moment(reimbursement.resolved).format("LLLL")}
                    </TableData>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

const TableHeader = styled.th`
  align-content: center;
  text-align: center;
`;

const TableData = styled.td`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
`;
