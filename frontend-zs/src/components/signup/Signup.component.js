import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class Signup extends React.Component {
  submitHandler = (event) => {
    console.log(this.state.email);
    console.log(this.state.password);
    event.preventDefault();
  };

  // ES6 allows expressions in bracket notation
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleLogin = async (event) => {
    try {
      const loginCredentials = {
        email: this.state.loginEmail,
        password: this.state.loginPassword
      };
      const response = await axios.post('http://localhost:3001/api/login', loginCredentials);
      console.log(response);
      localStorage.setItem('token', response.data.token);
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
      console.log(response);
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
      show: false
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
