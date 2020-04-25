import React from 'react';
import { Button, Form, Row, Col, Container, Modal } from 'react-bootstrap';
import './EditProfile.scss';

import { userService } from '../../services/userService';
class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      firstname: '',
      email: '',
      password: '',
      newPassword: '',
      show: false,
      message: ''
    };
  }
  /*
   componentDidMount() {
     axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue._id) // +this.props.match.params.id
       .then(response => {
         this.setState({
           firstname: response.data.firstname         
         })
       })
       .catch(function (error) {
         console.log(error);
       })
   };
   */


  handleFirstnameChange(event) {
    this.setState({ firstname: event.target.value });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleNewPasswordChange(event) {
    this.setState({ newPassword: event.target.value });
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });


  handleUpdateFirstname = async (event) => {
    try {
      var regex = /^[\u00C0-\u017Fa-zA-Z-']+$/;
      event.preventDefault();
      //console.log(bla.matches(/^[\u00C0-\u017Fa-zA-Z-']+$/i));
      if (regex.test(this.state.firstname)) {
        const res = await userService.updateUser({ firstname: this.state.firstname });
        if (res.status === 200) {
          this.setState({ message: 'You changed your Firstname.' }); this.handleShow();
        }
      } else {
        this.setState({ message: 'Please enter your New Firstname with Characters only.' }); this.handleShow();
      }
    }
    catch (e) {
      this.setState({ message: 'Firstname could not be changed' }); this.handleShow();
      console.log(e);
    }
  }

  handleUpdateEmail = async (event) => {
    try {
      event.preventDefault();
      const response = await userService.validatePassword({ password: this.state.password })
      const passwordStatus = response.status
      if (!this.state.email || !this.state.password) {
        this.setState({ message: 'Please fill in all required Information.' }); this.handleShow();
      }
      else if (passwordStatus === 200 && this.state.email) {
        const res = await userService.updateUser({ email: this.state.email, password: this.state.password });
        if (res.status === 200) {
          this.setState({ message: 'You changed your Email Address.' }); this.handleShow();
        }
      } else if (passwordStatus === 200 && !this.state.email) {
        this.setState({ message: 'Please enter your New Email Address.' }); this.handleShow();
      }
      else {
        this.setState({ message: 'Please enter your correct Password' }); this.handleShow();
      }
    }
    catch (e) {
      this.setState({ message: 'Email could not be changed' }); this.handleShow();
      console.log(e);
    }
  }

  handleUpdatePassword = async (event) => {
    try {
      event.preventDefault();
      const response = await userService.validatePassword({ password: this.state.password })
      const passwordStatus = response.status
      if (!this.state.newPassword || !this.state.password) {
        this.setState({ message: 'Please fill in all required Information.' }); this.handleShow();
      }
      else if (passwordStatus === 200 && this.state.newPassword) {
        const res = await userService.updateUser({ password: this.state.newPassword });
        if (res.status === 200) {
          this.setState({ message: 'You changed your Password.' }); this.handleShow();
        }
      } else if (passwordStatus === 200 && !this.state.newPassword) {
        this.setState({ message: 'Please enter your New Password.' }); this.handleShow();
      }
      else {
        this.setState({ message: 'Please enter your correct Password' }); this.handleShow();
      }
    }
    catch (e) {
      this.setState({ message: 'Password could not be changed' }); this.handleShow();
      console.log(e);
    }
  }

  handleDeleteUser = async (e) => {
    try {
      await userService.deleteUser();
    }
    catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <Container fluid="lg">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h3>Update your Profile</h3>
            <Form>
              <Form.Group>
                <Form.Label>Avatar</Form.Label>

              </Form.Group>
            </Form>
            <Form onSubmit={this.handleUpdateFirstname}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="Enter your new Firstname" onChange={this.handleFirstnameChange} />
              </Form.Group>
              <Form.Group >
                <Button variant="primary" type="submit">Save Firstname</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <br />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdateEmail}>
              <h3>Change Email</h3>
              <Form.Group controlId="formHorizontalEmail">
                <Form.Label>New Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your new email address" onChange={this.handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label >Password</Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Enter your password" onChange={this.handlePasswordChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Save Email</Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdatePassword}>
              <h3>Change Password</h3>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="newPassword" placeholder="Enter your new password" value={this.state.newPassword} onChange={this.handleNewPasswordChange} /*placeholder={this.state.email}*/ />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Enter your password" value={this.state.password} onChange={this.handlePasswordChange} /*placeholder={this.state.email}*/ />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">Save Password</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleDeleteUser}>
              <Form.Group>
                <Button variant="danger" type="submit">Delete Profile</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Success </Modal.Title>
          </Modal.Header>
          <Modal.Body> {this.state.message} </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
            <Button variant="primary" onClick={this.handleClose}>Ok </Button>
          </Modal.Footer>
        </Modal>

      </Container>

    )
  };
}

export default EditProfile;

