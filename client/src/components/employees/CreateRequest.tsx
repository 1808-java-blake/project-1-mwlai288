import axios from "axios";
import * as React from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";

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
    const payload = {
      amount: this.state.amount,
      author: this.state.author,
      description: this.state.description,
      type: this.state.type
    };
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

  // _signIn = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     email: this.state.email,
  //     password: this.state.password,
  //   }
  //   const response = await axios.post('/auth/sign_in', payload);
  //   setAxiosHeaders(response.headers);
  //   this.setState({redirect: true})
  // }

  public render() {
    return (
      <div>
        <h2>Submit a Reimbursement Request</h2>
        <Form onSubmit={this.createRequest}>
          <FormGroup row>
            <Label for="amount" sm={2}>
              Amount
            </Label>
            <Col sm={10}>
              <Input type="text" name="text" placeholder="Amount Spent" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="text"
                placeholder="Description of spending"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="type" sm={2}>
              Select
            </Label>
            <Col sm={10}>
              <Input type="select" name="type">
                <option>Food</option>
                <option>Travel</option>
                <option>Lodging</option>
                <option>Other</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
