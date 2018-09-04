import * as React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// export interface IAppProps {}

export default class SignIn extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h1>Sign In</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder"
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password placeholder"
            />
          </FormGroup>
          <Button>Sign In</Button>
        </Form>
      </div>
    );
  }
}
