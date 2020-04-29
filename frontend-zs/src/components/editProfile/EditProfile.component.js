import React, {useState} from 'react';
import { Button, Form, Row, Col, Container, Modal } from 'react-bootstrap';
import './EditProfile.scss';

import { userService } from '../../services/userService';
import ImagePicker from "react-image-picker";
import avatar1 from "../../assets/avatars/avatar1.png";
import avatar2 from "../../assets/avatars/avatar2.png";
import avatar3 from "../../assets/avatars/avatar3.png";
import avatar4 from "../../assets/avatars/avatar4.png";
import avatar5 from "../../assets/avatars/avatar5.png";
import avatar6 from "../../assets/avatars/avatar6.png";



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
      requiresPassword: false,
      changedValue: 0,
      show: false,
      message: '',
      avatar: null,
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
    this.setState({ firstname: event.target.value, requiresPassword: false, changedValue: 13 });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value, requiresPassword: true, changedValue: 11 });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handleNewPasswordChange(event) {
    this.setState({ newPassword: event.target.value, requiresPassword: true, changedValue: 12 });
  }
  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleUpdateUser = async (event) => {
    try {
      event.preventDefault();
      if (this.state.requiresPassword) {
        const response = await userService.validatePassword({ password: this.state.password })
        const passwordStatus = response.status
        if (passwordStatus === 200 && this.state.changedValue === 11) {
          const res = await userService.updateUser({ email: this.state.email, password: this.state.password });
          if (res.status === 200) { this.setState({ message: 'You changed your Email.' }); this.handleShow(); }
        }
        if (passwordStatus === 200 && this.state.changedValue === 12) {
          const res = await userService.updateUser({ password: this.state.newPassword });
          if (res.status === 200) { this.setState({ message: 'You changed your Password.' }); this.handleShow(); }
        }
        else { this.setState({ message: 'Please enter your actual password.' }); this.handleShow(); }
      }
      else if (this.state.changedValue === 13) {
        const res = await userService.updateUser({ firstname: this.state.firstname });
        if (res.status === 200) { this.setState({ message: 'You changed your Firstname.' }); this.handleShow(); }
      }
      else { this.setState({ message: 'Please fill all required fields.' }); this.handleShow(); }
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
      this.setState({ message: 'Please check your password' }); this.handleShow();
      console.log(e);
    }
  };

  handleDeleteUser = async (e) => {
    try {
      await userService.deleteUser();
    }
    catch (e) {
      console.log(e);
    }
  };

  avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  onPickImage = (avatar) => {
    this.setState({ avatar: avatar.src });
  }

  render() {
    return (
      <Container fluid="lg">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h3>Kids Section</h3>
            <ImagePicker
              images={this.avatars.map((image, i) => ({src: image, value: i}))}
              onPick={this.onPickImage}
            />
            <Form onSubmit={this.handleUpdateUser}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="Enter your new Firstname" value={this.state.firstname} onChange={this.handleFirstnameChange} />
              </Form.Group>
              <Form.Group >
                <Button variant="primary" type="submit">Save Firstname</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>


        <br/>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdateUser}>
              <h3>Change Email</h3>
              <Form.Group controlId="formHorizontalEmail">
                <Form.Label>New Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your new email address" onChange={this.handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label> Password </Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Enter your password" onChange={this.handlePasswordChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Save Email</Button>
            </Form>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdateUser}>
              <h3>Change Password</h3>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" name="newPassword" placeholder="Enter your new password" onChange={this.handleNewPasswordChange} /*placeholder={this.state.email}*/ />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Enter your password" onChange={this.handlePasswordChange} /*placeholder={this.state.email}*/ />
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

