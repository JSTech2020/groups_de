import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import { authenticationService } from "../../services/authentication.service";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginEmail: '',
      loginPassword: '',
    };
  };

  handleLogin = async (event) => {
    try {
      event.preventDefault();
      await authenticationService.login(this.state.loginEmail, this.state.loginPassword);
    } catch (e) {
      console.log(e);
    }
  };

  // ES6 allows expressions in bracket notation
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <Container fluid="lg">
        {authenticationService.currentUserValue !== null &&
          <Redirect to="/lesen" />
        }
        {authenticationService.currentUserValue === null &&
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={this.handleLogin}>
            <h3> Sign in </h3>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email address" name="loginEmail"
                            onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="loginPassword" placeholder="Enter your password"
                            onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
            <p> Forgot Password?</p>
          </Form>
          </Col>
        </Row>
        }
      </Container>
    )
  }
}


export default Login;
