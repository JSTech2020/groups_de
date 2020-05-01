import React, {useState} from 'react';
import { Button, Form, Row, Col, Container, Modal } from 'react-bootstrap';
import './EditProfile.scss';

import { userService } from '../../services/userService';
import ImagePicker from "react-image-picker";

const avatar1 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar1.png"
const avatar2 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar2.png"
const avatar3 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar3.png"
const avatar4 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar4.png"
const avatar5 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar5.png"
const avatar6 = "https://zsdevelopment.s3.eu-central-1.amazonaws.com/static/media/avatar6.png"

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
      message: '',
      avatar: null,
    };
  }

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

  handleAvatarUpdate = async(e) => {
    e.preventDefault();
    try {
      if (this.state.avatar === null) {
        return;
      }
      const response = await userService.updateUser({ avatar: this.state.avatar });
      if (response.status === 200) {
        console.log("successfully updated avatar");
      }
    } catch(e) {
      console.log(e);
    }
  }

  avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  onPickImage = (avatar) => {
    this.setState({ avatar: avatar.src });
  }

  render() {
    return (
      <Container fluid="lg">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <h3 style={{ marginTop: "20px" }}>Dein Profil</h3>
            <Form onSubmit={this.handleAvatarUpdate}>
              <Form.Group>
                <Form.Label>Avatar</Form.Label>
                <ImagePicker
                  images={this.avatars.map((image, i) => ({src: image, value: i}))}
                  onPick={this.onPickImage}
                />
                <Button variant="primary" type="submit">Avatar speichern</Button>
              </Form.Group>
            </Form>
            <Form onSubmit={this.handleUpdateFirstname}>
              <Form.Group controlId="formBasicText">
                <Form.Label>Vorname</Form.Label>
                <Form.Control type="text" placeholder="Neuer Vorname" onChange={this.handleFirstnameChange} />
              </Form.Group>
              <Form.Group >
                <Button variant="primary" type="submit">Vorname speichern</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdateEmail}>
              <h3>Email ändern</h3>
              <Form.Group controlId="formHorizontalEmail">
                <Form.Label>Neue Email-Adresse</Form.Label>
                <Form.Control type="email" placeholder="Neue Email-Adresse" onChange={this.handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label> Passwort </Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Aktuelles Passwort" onChange={this.handlePasswordChange} />
              </Form.Group>
              <Button variant="primary" type="submit">Email speichern</Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleUpdatePassword}>
              <h3>Passwort ändern</h3>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>Neues Passwort</Form.Label>
                <Form.Control type="password" name="newPassword" placeholder="Neues Passwort" onChange={this.handleNewPasswordChange} /*placeholder={this.state.email}*/ />
              </Form.Group>
              <Form.Group controlId="formHorizontalPassword">
                <Form.Label>Passwort</Form.Label>
                <Form.Control type="password" name="currentPassword" placeholder="Aktuelles Passwort" onChange={this.handlePasswordChange} /*placeholder={this.state.email}*/ />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">Passwort speichern</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Form onSubmit={this.handleDeleteUser}>
              <Form.Group>
                <Button variant="danger" type="submit">Profil Löschen</Button>
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

