import axios from "axios";
import * as React from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class CreateRequests extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      amount: 0,
      description: "",
      errors: "",
      id: 0,
      status: "Pending",
      typeId: 1
    };
  }

  public handleChange = (e: any) => {
    const newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  public createRequest = async (e: any) => {
    e.preventDefault();

    const payload = {
      amount: this.state.amount,
      description: this.state.description,
      id: this.state.id,
      status: this.state.status,
      typeId: this.state.typeId
    };

    try {
      const res = await axios.post(
        "http://localhost:3001/reimbursement",
        payload
      );
      console.log(res.status);
      if (res.status === 201) {
        toast.success("🦄 Request successfully created", {
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: true,
          pauseOnHover: true,
          position: "top-center"
        });
      } else {
        toast.error("Error creating request", {
          autoClose: 2000,
          closeOnClick: true,
          draggable: true,
          hideProgressBar: true,
          pauseOnHover: true,
          position: "top-center"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  public render() {
    return (
      <div>
        <h2>Submit a Reimbursement Request</h2>
        <p>Please provide your user Id and reimbursement type Id.</p>
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

        <Form onSubmit={this.createRequest}>
          <FormGroup row>
            <Label for="amount" sm={2}>
              Amount
            </Label>
            <Col sm={10}>
              <Input
                onChange={this.handleChange}
                type="text"
                name="amount"
                placeholder="$ Amount Spent"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="id" sm={2}>
              User Id
            </Label>
            <Col sm={10}>
              <Input
                onChange={this.handleChange}
                type="number"
                name="id"
                placeholder="Enter User Id"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="description" sm={2}>
              Description
            </Label>
            <Col sm={10}>
              <Input
                onChange={this.handleChange}
                type="text"
                name="description"
                placeholder="Description of spending"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="type" sm={2}>
              Reimbursement Type
            </Label>
            <Col sm={10}>
              <Input
                onChange={this.handleChange}
                type="number"
                name="typeId"
                placeholder="1 - Lodging, 2 - Travel, 3 - Food, 4 - Other"
              />
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="primary">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
