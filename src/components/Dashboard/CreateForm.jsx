import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import dataLayer from "./../../data";
const connection = new dataLayer();

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDevice: true
    };
  }

  // Begin Handlers
  handleCreateDeviceOrReading = () => {
    if (this.state.createDevice)
      connection.devices
        .createDevice()
        .then(() => {
          this.props.handleCreateDeviceSuccess();
        })
        .catch(error =>
          this.setState({
            failedRequest: "Unable to create device. Try again soon."
          })
        );
  };

  render() {
    return (
      <Container>
        <Row>
          <Col sm="12" id="dashboard-header">
            <h1>Register a New Device or Reading</h1>
          </Col>
        </Row>
        <Row id="Dashboard-body">
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
            <Button>Submit</Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default CreateForm;
