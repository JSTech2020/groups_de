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
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      // avatar:'',
      firstname: '',
      email: '',
      password: '',
      newPassword: '',
      requiresPassword: false,
      changedValue: 0,
    };
  }

  // 
  /*componentDidMount() {
    axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue._id) // +this.props.match.params.id
      .then(response => {
        this.setState({
          email: response.data.email,
          
          
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  };*/

  handleFirstnameChange(event) {
    this.setState({ firstname: event.target.vale, requiresPassword: false });
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

  handleUpdateUser = async (event) => {
    try {
      event.preventDefault();
      if (this.state.requiresPassword) {
        const response = await userService.validatePassword({ password: this.state.password })
        const passwordStatus = response.status
        window.alert(response.data.message)
        if (passwordStatus === 200 && this.state.changedValue === 11) {
          console.log("super");
          await userService.updateUser({ email: this.state.email, password: this.state.password });        
        }
        if (passwordStatus === 200 && this.state.changedValue === 12) {
          console.log("change password");
          await userService.updateUser({ password: this.state.newPassword });          
        }
      }
      else {
        console.log("ich möchte den vornamen ändern");
        await userService.updateUser({ firstname: this.state.firstname });
      }
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
      window.alert('Password incorrect');
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
              <Form>
                <Form.Group as={Row} controlId="formBasicText">
                  <Form.Label column sm={2}>Firstname</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="text" placeholder="firstname" value={this.state.firstname} onChange={this.handleFirstnameChange} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm={{ span: 10, offset: 2 }}>
                    <Button variant="primary" type="submit" onSubmit={this.handleUpdateUser}>change Name</Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>

            <div className="panel panel-default">
              <h4 className="panel-title">Edit Email</h4>
              <Form onSubmit={this.handleUpdateUser}>

                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>New Email</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="email" placeholder="email" onChange={this.handleEmailChange} /*placeholder={this.state.email}*/ />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="password" autoComplete="current-Password" onChange={this.handlePasswordChange} /*placeholder={this.state.email}*/ />
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
              <Form onSubmit={this.handleUpdateUser}>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>New Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="new password" autoComplete="new-Password" onChange={this.handleNewPasswordChange} /*placeholder={this.state.email}*/ />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>Password</Form.Label>
                  <Col sm={10}>
                    <Form.Control type="password" placeholder="password" autoComplete="current-Password" onChange={this.handlePasswordChange} /*placeholder={this.state.email}*/ />
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


          </div>
        </div>
      </div>
    )
  };
}

export default EditProfile;
