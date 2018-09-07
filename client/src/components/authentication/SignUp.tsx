import * as React from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default class SignUp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      username: ""
    };
  }

  public signUp = async (e: any) => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      password: this.state.password,
      username: this.state.username
    };
    const res = await axios.post("http://localhost:3001/users", payload);
    if (res.status === 201) {
      this.props.history.push("/");
    } else {
      throw Error("Error Creating user");
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
        <h1>Sign Up</h1>
        <Form onSubmit={this.signUp}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="username"
              placeholder="username"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              onChange={this.handleChange}
              type="password"
              name="password"
              placeholder="password"
            />
            <Label for="first_name">First Name</Label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="first_name"
              placeholder="First Name"
            />
            <Label for="last_name">Last Name</Label>
            <Input
              onChange={this.handleChange}
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
            <Label for="email">Email</Label>
            <Input
              onChange={this.handleChange}
              type="email"
              name="email"
              placeholder="Email"
            />
          </FormGroup>
          <Button>Sign Up</Button>
        </Form>
      </div>
    );
  }
}
