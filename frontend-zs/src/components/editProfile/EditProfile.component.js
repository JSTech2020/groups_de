import React from 'react';
import { Button, Image, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';


import './EditProfile.scss';
import superheld from "../../superheld.png";
import { authenticationService } from "../../services/authentication.service"
import { userService } from '../../services/userService';

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    //this.handleAvatarChange = this.handleAvatarChange.bind(this);
    //this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
   
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  
    this.state = {
      // avatar:'',
      firstname: '',
      email: '',
      //emailConfirmation: '',
      password: '',
      //passwordConfirmation: '',
     // currentPassword: ''
      /*pin: '',
      kidCanPost: false*/
    };
  }
  
  // 
  componentDidMount() {
    axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue._id) // +this.props.match.params.id
      .then(response => {
        this.setState({
          email: response.data.email,
          
          
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  handleFirstnameChange(event) {
    this.setState({ firstname: event.target.vale });
  }
  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }



  handleNewEmail = async (event) => {
    try {
     const body = {
       email: this.state.email,
       password: this.state.password
     }
      event.preventDefault();
      await userService.updateUser(body);
      // page refresh alternative solution
      // window.location.reload();
      this.setState({
        emailConfirmation: this.state.email,
        currentPassword: '',
        email: ''
      })
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
      window.alert('Email or Password incorrect');
      console.log(e);
    }
  };

  handleNewPassword = async (event) => {
    try {
      event.preventDefault();
      await userService.changePassword({ ...this.state });
      this.setState({
        passwordConfirmation: '',
        password: ''
      })
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
      window.alert('Email or Password incorrect');
      console.log(e);
    }
  };

  handleNewFirstname = async (event) => {
    try {
      event.preventDefault();
      await userService.changeFirstname({ ...this.state });
      this.setState({
        firstname: this.state.firstname
      })
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
      window.alert('Firstname change not possible');
      console.log(e);
    }
  };

  deleteProfile = async (event) => {
    try {
      const response = await axios.delete('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id);
      authenticationService.logout();
      console.log(response);
    }
    catch (e) {
      console.log(e);
    }
  };


  render() {
    return (
      <div className="container bootstrap snippets">

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <form className="form-horizontal" >

              <div className="panel panel-default">
                <h4 className="panel-title">Kids Section</h4>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>Avatar</Form.Label>
                    <div className="col-sm-10">
                      <ul>
                        <li >
                          <a href="/">
                            <Image src={superheld} width="40" roundedCircle />
                          </a>
                        </li>
                        <li >
                          <a href="/">
                            <Image src={superheld} width="40" roundedCircle />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </Form.Group>
                  </Form>
                  <Form onSubmit={this.handleNewFirstname}>
                  <Form.Group as={Row} controlId="formBasicText">
                    <Form.Label column sm={2}>Firstname</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" value={this.state.firstname} onChange={this.handleFirstnameChange} disabled/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button variant="primary" type="submit" disabled>change Name</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>

              <div className="panel panel-default">
                <h4 className="panel-title">Edit Email</h4>
                <Form onSubmit={this.handleNewEmail}>
                  
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>New Email</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange} /*placeholder={this.state.email}*/ />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button variant="primary" type="submit">change Email</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>

              <div className="panel panel-default">
                <h4 className="panel-title">Edit Password</h4>
                <Form onSubmit={this.handleNewPassword}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>New Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button variant="primary" type="submit">change Password</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>

              <div className="panel panel-default">
                <Form>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button variant="danger" type="submit" onClick={this.deleteProfile}>Delete Profile</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  };
}

export default EditProfile;
