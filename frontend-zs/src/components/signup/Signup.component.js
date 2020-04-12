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
    };
  };

  render() {
    return (
      <div>
      <h3> Sign up </h3>
      <Form onSubmit={this.handleSignup}>
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
      </div>
    );
  }
}

export default Signup;
