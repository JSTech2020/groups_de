import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userService } from "../../services/userService";

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
    await userService.signUp(signupCredentials);
    this.handleShow();
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  constructor(props) {
    super(props);
    this.state = {
      signupEmail: '',
      signupPassword: '',
      show: false
    };
  };

  render() {
    return (
      <div className={'form-container'}>
        <Form className={'submit-form'} onSubmit={this.handleSignup}>
          <h3> Sign up </h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="signupEmail" onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="signupPassword" onChange={this.handleChange} />
          </Form.Group>
          <Button className={'form-button'} variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Success </Modal.Title>
          </Modal.Header>
          <Modal.Body> Please verify you email by clicking the link in the email. </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Signup;
