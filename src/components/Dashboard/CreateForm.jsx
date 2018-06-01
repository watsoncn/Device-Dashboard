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
import shortid from "shortid";
import dataLayer from "./../../data";
const connection = new dataLayer();

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDevice: true,
      mouseEnterDevice: true,
      deviceName: "",
      readingType: "",
      readingValue: null,
      deviceId: ""
    };
  }

  // Begin Handlers
  handleCancelOrSubmit = submit => {
    submit ? this.buildAndSubmit() : this.props.cancelForm(submit);
  };

  buildAndSubmit = () => {
    if (this.state.createDevice) {
      const device = {
        name: this.state.deviceName
      };
      this.props.handleSubmitDevice(device);
    } else {
      let deviceId = shortid.generate();
      const reading = {
        type: this.state.readingType,
        value: this.state.readingValue,
        deviceId: deviceId.substr(deviceId.length, -9)
      };
      console.log(reading);
      this.props.handleSubmitDevice(reading);
    }
  };

  mouseEnterDevice = enterDevice => {
    this.setState({ mouseEnterDevice: enterDevice });
  };

  autoFillName(e, deviceName) {
    e.preventDefault();
    this.setState({ deviceName });
  }

  render() {
    const { deviceName } = this.state;
    return (
      <Container>
        <Row>
          <Col sm="12" id="dashboard-header">
            <h1>Register a New Device or Reading</h1>
          </Col>
        </Row>
        <Row id="CreateForm-body">
          <Col sm="2" />
          <Col
            className="formType"
            onMouseEnter={() => this.mouseEnterDevice(true)}
            sm="3">
            <Form>
              <FormGroup>
                <Label for="deviceName">Device Name</Label>
                <Input
                  value={deviceName}
                  onChange={e => this.setState({ deviceName: e.target.value })}
                  placeholder="Create or select below"
                  id="deviceName"
                  required
                />
                <small>
                  <a
                    className="autoNames"
                    onClick={e => this.autoFillName(e, "Entryway")}
                    href="">
                    Entryway
                  </a>
                  <a
                    className="autoNames"
                    onClick={e => this.autoFillName(e, "Bedroom")}
                    href="">
                    Bedroom
                  </a>
                  <a
                    className="autoNames"
                    onClick={e => this.autoFillName(e, "Lounge")}
                    href="">
                    Lounge
                  </a>
                </small>
              </FormGroup>
              <Button
                onClick={() => this.handleCancelOrSubmit(true)}
                className="submitButton">
                Submit
              </Button>
              <Button
                onClick={() => this.handleCancelOrSubmit(false)}
                className="cancelButton">
                Cancel
              </Button>
            </Form>
          </Col>
          <Col sm="2" />
          <Col
            className="formType"
            onMouseEnter={() => this.mouseEnterDevice(false)}
            sm="3">
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
              <Button
                onClick={() => this.handleCancelOrSubmit(true)}
                className="submitButton">
                Submit
              </Button>
              <Button
                onClick={() => this.handleCancelOrSubmit(false)}
                className="cancelButton">
                Cancel
              </Button>
            </Form>
          </Col>
          <Col sm="2" />
        </Row>
      </Container>
    );
  }
}

export default CreateForm;
