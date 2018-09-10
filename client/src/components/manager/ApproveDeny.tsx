import * as React from "react";
import axios from "axios";
import { Button } from "reactstrap";
import * as moment from "moment";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

export default class ApproveDeny extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      reimbursements: {
        statusId: 1
      }
    };
  }

  public onChange = (e: any) => {
    const newState = { ...this.state.reimbursements };
    newState[e.target.name] = e.target.value;
    this.setState({ reimbursements: newState });
  };

  public async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios(`http://localhost:3001/reimbursement/${id}`, {
      method: "get",
      withCredentials: true
    });

    this.setState({
      reimbursements: res.data
    });
  }

  public approveRequest = async (e: any) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.reimbursements;
    try {
      const res = await axios(`http://localhost:3001/reimbursement/${id}`, {
        data: payload,
        method: "put",
        withCredentials: true
      });
      if (res.status === 201) {
        toast.success("🦄 Request approved", {
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: true,
          pauseOnHover: true,
          position: "top-center"
        });
        this.props.history.push("/requests");
      }
    } catch (error) {
      console.log(error);
    }
  };

  public denyRequest = async (e: any) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.reimbursements;
    try {
      const res = await axios(`http://localhost:3001/reimbursement/${id}`, {
        data: payload,
        method: "put",
        withCredentials: true
      });
      console.log(res.status);
      if (res.status === 201) {
        toast.success("🦄 Request denied", {
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: true,
          pauseOnHover: true,
          position: "top-center"
        });
        this.props.history.push("/requests");
      }
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    const { reimbursements } = this.state;
    return (
      <div>
        <Title>Approve or Deny the Request</Title>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <div className="table-responsive" key={reimbursements.id}>
          <table className="table table-bordered">
            <thead>
              <tr>
                <TableHeader>Amount</TableHeader>
                <TableHeader>Request Description</TableHeader>
                <TableHeader>User Id</TableHeader>
                <TableHeader>Date Request Submitted</TableHeader>
                <TableHeader>Request Type</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableData> Amount: ${reimbursements.amount}</TableData>
                <TableData>
                  Request Description: {reimbursements.description}
                </TableData>
                <TableData> {reimbursements.author} </TableData>
                <TableData>
                  Request Submitted:
                  {moment(reimbursements.reimb_submitted).format("LLLL")}
                </TableData>
                <TableData>
                  Request Type:
                  {reimbursements.typeId}
                </TableData>
              </tr>
            </tbody>
          </table>
        </div>

        <form>
          <div>
            <label htmlFor="edit">Approve or Deny </label>
            <input
              onChange={this.onChange}
              type="number"
              name="statusId"
              placeholder={this.state.reimbursements.statusId}
            />
          </div>
          <Button color="primary" onClick={this.approveRequest}>
            Approve
          </Button>
          <Button color="danger" onClick={this.denyRequest}>
            Deny
          </Button>
        </form>
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
