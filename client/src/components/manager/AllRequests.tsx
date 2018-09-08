import axios from "axios";
import { Link } from "react-router-dom";
import * as React from "react";
import * as moment from "moment";
import * as classnames from "classnames";
import styled from "styled-components";
import FlipMove from "react-flip-move";
import { Input } from "reactstrap";

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
        return reimbursement.reimb_status.indexOf(this.state.search) !== -1;
      }
    );

    return (
      <div>
        <Title>The Justice League's Reimbursement Request</Title>
        <Input
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
            <FlipMove typeName="tbody">
              {filteredStatus.map((reimbursement: any) => (
                <tr
                  className={classnames("bg-success", {
                    "bg-danger": reimbursement.reimb_status === "Denied",
                    "bg-info": reimbursement.reimb_status === "Pending"
                  })}
                  key={reimbursement.reimb_id}
                >
                  <TableData> {reimbursement.ers_username} </TableData>
                  <TableData>${reimbursement.reimb_amount}</TableData>
                  <TableData> {reimbursement.reimb_description} </TableData>
                  <TableData>
                    {moment(reimbursement.reimb_submitted).format("LLLL")}
                    <br />
                    {moment(reimbursement.reimb_submitted).fromNow()}
                  </TableData>
                  <TableData>
                    {moment(reimbursement.reimb_resolved).format("LLLL")}
                  </TableData>
                  <TableData> {reimbursement.reimb_type} </TableData>

                  <TableData>
                    <LinkText to={`/request/${reimbursement.reimb_id}`}>
                      {reimbursement.reimb_status}
                    </LinkText>
                  </TableData>
                </tr>
              ))}
            </FlipMove>
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
  font-weight: bold;
  text-align: center;
`;

const LinkText = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  a:hover {
    color: red;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
`;
