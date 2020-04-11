import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { authenticationService } from "../../services/authentication.service";

class Signup extends React.Component {

  // ES6 allows expressions in bracket notation
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async (event) => {
    try {
      await authenticationService.login(this.state.loginEmail, this.state.loginPassword);
      this.handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  handleSignup = async (event) => {
    try {
      const signupCredentials = {
        email: this.state.signupEmail,
        password: this.state.signupPassword
      };
      const response = await axios.post('http://localhost:3001/api/signup', signupCredentials);
    } catch (e) {
      console.log(e);
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      signupEmail: '',
      signupPassword: '',
      loginEmail: '',
      loginPassword: '',
    };
  };

  render() {
    return (
      <div>
      <Form onSubmit={this.handleSignup}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="signupEmail" onChange={this.handleChange}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="signupPassword" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <span onClick={this.handleShow}>
          To Login
        </span>
      </Form>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" name="loginEmail" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="loginPassword" placeholder="Enter your password" onChange={this.handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleLogin}>
            Sign in
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default Signup;
