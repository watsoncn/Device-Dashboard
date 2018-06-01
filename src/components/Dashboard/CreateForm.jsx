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
      createDevice: true,
      deviceName: "",
      readingType: "",
      readingValue: 0,
      readingDeviceId: ""
    };
  }

  // Begin Handlers
  handleCancelOrSubmit = (submit, deviceNotReading) => {
    submit
      ? this.setState({ createDevice: deviceNotReading }, () =>
          this.buildAndSubmit()
        )
      : this.props.cancelForm(submit);
  };

  buildAndSubmit = () => {
    if (this.state.createDevice) {
      const device = {
        name: this.state.deviceName
      };
      this.props.handleSubmitDevice(device, true);
    } else {
      const reading = {
        type: this.state.readingType,
        value: +this.state.readingValue,
        deviceId: this.state.readingDeviceId
      };
      this.props.handleSubmitDevice(reading, false);
    }
  };

  autoFillName(e, deviceName) {
    e.preventDefault();
    this.setState({ deviceName });
  }

  render() {
    const {
      deviceName,
      readingType,
      readingValue,
      readingDeviceId
    } = this.state;
    const { deviceList } = this.props;
    return (
      <Container>
        <Row>
          <Col sm="12" id="dashboard-header">
            <h1>Register a New Device or Reading</h1>
          </Col>
        </Row>
        <Row id="CreateForm-body">
          <Col sm="2" />
          <Col className="formType" sm="3">
            <Form className="formType">
              <h4>Create Device</h4>
              <hr />
              <FormGroup>
                <Label for="deviceName">* Device Name</Label>
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
                onClick={() => this.handleCancelOrSubmit(true, true)}
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
          <Col className="formType" sm="3">
            <Form className="formType">
              <h4>Create Reading</h4>
              <hr />
              <FormGroup>
                <Label for="readingDevice">* Device</Label>
                <Input
                  onChange={e =>
                    this.setState({ readingDeviceId: e.target.value })
                  }
                  type="select"
                  id="readingDevice">
                  <option>Select Device</option>
                  {deviceList.map(device => (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="readingType">* Reading Type</Label>
                <Input
                  defaultValue={readingType}
                  onChange={e => this.setState({ readingType: e.target.value })}
                  type="select"
                  id="readingType">
                  <option>Select Type</option>
                  <option value="temperature">Temperature</option>
                  <option value="humidity">Humidity</option>
                  <option value="airquality">Air Quality</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="readingValue">* Reading Value</Label>
                <Input
                  value={readingValue}
                  onChange={e =>
                    this.setState({ readingValue: e.target.value })
                  }
                  placeholder={
                    readingType === "temperature"
                      ? "Degrees in F"
                      : "Measurement percent"
                  }
                  id="readingValue"
                  type="number"
                />
              </FormGroup>
              <Button
                onClick={() => this.handleCancelOrSubmit(true, false)}
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
