import axios from "axios";
import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class SignIn extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      ers_password: "",
      ers_username: ""
    };
  }

  public signIn = async (e: any) => {
    e.preventDefault();
    const payload = {
      ers_password: this.state.ers_password,
      ers_username: this.state.ers_username
    };
    try {
      const res = await axios.post(
        "http://localhost:3001/users/login",
        payload
      );
      console.log(res.statusText);
    } catch (error) {
      console.log(error);
    }
  };

  public handleChange = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  public render() {
    return (
      <div>
        <h1>Sign In</h1>
        <Form onSubmit={this.signIn}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="ers_username"
              placeholder="Enter Username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={this.handleChange}
              type="password"
              name="ers_password"
              placeholder="Enter Password"
            />
          </FormGroup>
          <Button>Sign In</Button>
        </Form>
      </div>
    );
  }
}
