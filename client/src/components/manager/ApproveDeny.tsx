import * as React from "react";
import axios from "axios";

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
    const res = await axios.get(`http://localhost:3001/reimbursement/${id}`);
    this.setState({
      reimbursements: res.data
    });
    console.log(this.state.reimbursements.statusId);
  }

  public approveRequest = async (e: any) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.reimbursements;
    try {
      await axios.put(`http://localhost:3001/reimbursement/${id}`, payload);
    } catch (error) {
      console.log(error);
    }
  };

  public denyRequest = async (e: any) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const payload = this.state.reimbursements;
    try {
      await axios.put(`http://localhost:3001/reimbursement/${id}`, payload);
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    const { reimbursements } = this.state;
    return (
      <div>
        <h2>hello</h2>
        {/* {this.state.reimbursements.map((reimbursement: any) => {
          return ( */}
        <ul key={reimbursements.id}>
          <li> Amount: ${reimbursements.amount}</li>
          <li> Request Description: {reimbursements.description}</li>
          <li> User Id: {reimbursements.author} </li>
          <li>Request Submitted: {reimbursements.submitted}</li>
          <li> Request Resolved: {reimbursements.resolved} </li>
          <li> Manager: {reimbursements.resolverId} </li>
          <li>
            Request Type:
            {reimbursements.typeId}
          </li>
          <li>
            Request Status:
            {reimbursements.statusId}
          </li>
        </ul>

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
          <button onClick={this.approveRequest}>Approve</button>
          <button onClick={this.denyRequest}>Deny</button>
        </form>

        {/* ); */}
        {/* })} */}
        {/* <button onClick={this.approveRequest}>Approve</button> */}
      </div>
    );
  }
}
