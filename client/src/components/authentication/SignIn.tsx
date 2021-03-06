import axios from "axios";
import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
      const res = await axios("http://localhost:3001/users/login", {
        data: payload,
        method: "post",
        withCredentials: true
      });

      localStorage.setItem("user", JSON.stringify(res));
      const { id } = res.data;
      if (res.status === 200 && res.data.username === "Batman") {
        this.props.history.push("/requests");
      } else {
        this.props.history.push(`/users/${id}`);
      }
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
      <BackgroundStyle>
        <BoxView>
          <Title>Sign In Hero</Title>
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
          <Link to="/sign-up">New Recruit? Sign Up Here</Link>
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
  width: 25rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  text-align: center;
`;
