import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container, Row, Col } from "react-bootstrap";

class Signup extends React.Component {

  // ES6 allows expressions in bracket notation
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignup = async (event) => {
    event.preventDefault();
    const signupCredentials = {
      email: this.state.signupEmail,
      password: this.state.signupPassword
    };
    const response = await userService.signUp(signupCredentials);
    if (response.status === 200) { this.handleShow(); }
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  constructor(props) {
    super(props);

    this.state = {
      signupEmail: '',
      signupPassword: '',
    };
  };

  render() {
    return (
    <Container fluid="lg">
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={this.handleSignup}>
            <h3> Sign up </h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="signupEmail" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="signupPassword" onChange={this.handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default Signup;
