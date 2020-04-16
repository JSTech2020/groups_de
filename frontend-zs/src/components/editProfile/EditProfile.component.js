import React from 'react';
import { Button, Image, Form } from 'react-bootstrap';
import axios from 'axios';


import './EditProfile.scss';
import superheld from "../../superheld.png";
import { authenticationService } from "../../services/authentication.service"
import { userService } from '../../services/userService';
import ModalComponent from '../ModalComponent/modalComponent.component'


class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    //this.handleAvatarChange = this.handleAvatarChange.bind(this);
    //this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailConfirmationChange = this.handleEmailConfirmationChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
    this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);

    this.state = {
      // avatar:'',
      //username: '',
      email: '',
      emailConfirmation: '',
      password: '',
      passwordConfirmation: '',
      currentPassword: ''
      /*pin: '',
      kidCanPost: false*/
    };
  }

  // 
  componentDidMount() {
    axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id) // +this.props.match.params.id
      .then(response => {
        this.setState({
          emailConfirmation: response.data.email,


        })
      })
      .catch(function (error) {
        console.log(error);
      })
  };


  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }
  handleEmailConfirmationChange(event) {
    this.setState({ emailConfirmation: event.target.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }
  handlePasswordConfirmationChange(event) {
    this.setState({ passwordConfirmation: event.target.value });
  }
  handleCurrentPasswordChange(event) {
    this.setState({ currentPassword: event.target.value });
  }


  handleNewEmail = async (event) => {
    try {
      event.preventDefault();
      await userService.changeEmail({ ...this.state });
      // page refresh alternative solution
      // window.location.reload();
      this.setState({
        emailConfirmation: this.state.email,
        currentPassword:'',
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
          <div className="col-xs-12 col-sm-9">
            <form className="form-horizontal" >

              <div className="panel panel-default">
                <h4 className="panel-title">Option 2 for Email Change</h4>
                <Form onSubmit={this.handleNewEmail}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="col-sm-2">Current Email</Form.Label>
                    <Form.Control type="email" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} />
                  </Form.Group>
                  <ModalComponent></ModalComponent>
                </Form>
              </div>

              <div className="panel panel-default">
                <h4 className="panel-title">Kids Section</h4>
                <Form>
                  <Form.Group>
                    <Form.Label className="col-sm-2">Avatar</Form.Label>
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
                  <Form.Group>
                    <Form.Label className="col-sm-2">Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" disabled />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled>change Name</Button>
                </Form>
              </div>

              <div className="panel panel-default">
                <h4 className="panel-title">Email Change</h4>
                <Form onSubmit={this.handleNewEmail}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="col-sm-2">Current Email</Form.Label>
                    <Form.Control type="email" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="col-sm-2">New Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} onChange={this.handleEmailChange} /*placeholder={this.state.email}*/ />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="col-sm-2">Current Password</Form.Label>
                    <Form.Control type="password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">change Email</Button>
                </Form>
              </div>

              <div className="panel panel-default">
                <h4 className="panel-title">Password Change</h4>
                <Form onSubmit={this.handleNewPassword}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="col-sm-2">Current Email </Form.Label>
                    <Form.Control type="text" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} /*placeholder={this.state.email}*/ />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="col-sm-2">Current Password</Form.Label>
                    <Form.Control type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} /*placeholder={this.state.email}*/ />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label className="col-sm-2">New Password</Form.Label>
                    <Form.Control type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">change Password</Button>
                </Form>
              </div>

              <div className="panel panel-default">
                <Form>
                  <Form.Group >
                    <Button variant="danger" type="submit" onClick={this.deleteProfile}>Delete Profile</Button>
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
