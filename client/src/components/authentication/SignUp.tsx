import * as React from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";

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
      <BackgroundStyle>
        <BoxView>
          <Title>Sign Up</Title>
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
        </BoxView>
      </BackgroundStyle>
    );
  }
}

const BackgroundStyle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const BoxView = styled.div`
  background-color: #221fe7;
  border-color: #ec0f0f;
  border-style: solid;
  border-width: thick;
  color: #f2f221;
  padding: 2rem;
  width: 30rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
`;
