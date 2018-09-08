import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as moment from "moment";
// import FlipMove from "react-flip-move";

export default class AllRequests extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: [],
      search: ""
    };
  }

  public async componentDidMount() {
    const res = await axios("http://localhost:3001/reimbursement", {
      method: "get",
      withCredentials: true
    });
    this.setState({
      reimbursements: res.data
    });
  }

  public filterStatus = (event: any) => {
    this.setState({ search: event.target.value });
  };

  public render() {
    const filteredStatus = this.state.reimbursements.filter(
      (reimbursement: any) => {
        return (
          reimbursement.reimb_status
            .toLowerCase()
            .indexOf(this.state.search.toLowerCase()) !== -1
        );
      }
    );

    return (
      <div>
        <Title>The Justice League's Reimbursement Request</Title>
        <input
          type="text"
          placeholder="Filter Request Status"
          value={this.state.search}
          onChange={this.filterStatus}
        />
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <TableHeader>User Name</TableHeader>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Request Description</TableHeader>
                <TableHeader>Date Request Submitted</TableHeader>
                <TableHeader>Date Request Resolved</TableHeader>
                <TableHeader>Request Type</TableHeader>
                <TableHeader>Request Status</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredStatus.map((reimbursement: any) => (
                <tr
                  className={
                    reimbursement.reimb_status === "Approved"
                      ? "table-success"
                      : "table-danger"
                  }
                  key={reimbursement.reimb_id}
                >
                  <TableData> {reimbursement.ers_username} </TableData>
                  <TableData>${reimbursement.reimb_amount}</TableData>
                  <TableData> {reimbursement.reimb_description} </TableData>
                  <TableData>
                    {moment(reimbursement.reimb_submitted).format("LLLL")}
                  </TableData>
                  <TableData>
                    {moment(reimbursement.reimb_resolved).format("LLLL")}
                  </TableData>
                  <TableData> {reimbursement.reimb_type} </TableData>

                  <TableData>
                    <Link to={`/request/${reimbursement.reimb_id}`}>
                      {reimbursement.reimb_status}
                    </Link>
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
