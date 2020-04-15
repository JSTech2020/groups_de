import React, { Component } from 'react';
import { Image, Form } from 'react-bootstrap';
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
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailConfirmationChange = this.handleEmailConfirmationChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    /* this.handlePinChange = this.handlePinChange.bind(this);
     this.handleKidCanPost = this.handleKidCanPost.bind(this);
 
     this.getProfile = this.getProfile.bind(this);*/
    this.state = {
      // avatar:'',
      //username: '',
      email: '',
      emailConfirmation: '',
      password: '',
      /*pin: '',
      kidCanPost: false*/
    };
  }

  // 
  componentDidMount() {
    axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id) // +this.props.match.params.id
      .then(response => {
        this.setState({
          emailConfirmation: response.data.email
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleEmailConfirmationChange(event) {
    this.setState({ emailConfirmation: event.target.value });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleNewEmail = async (event) => {
    try {
      event.preventDefault();
      await userService.changeEmail({ ...this.state });
    } catch (e) {
      // hier müsste zb dialogfenster aufpoppen oder text anzeigen, dass es ein fehler gibt
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
            <form className="form-horizontal">
              <div className="panel panel-default">
                <div className="panel-body text-center">
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Kid Section</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Avatar</label>
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
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Userame</label>
                    <div className="col-sm-10">
                      <input className="form-control" type="text" placeholder="hier steht der username" disabled />
                    </div>
                    <div>
                      <button id="submitUpdate" onClick={this.updateProfile} type="submit" className="btn btn-primary" disabled>Change username</button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Parent Section</h4>
                </div>

                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">New Email</label>
                    <div className="col-sm-10">
                      <input className="form-control" value={this.state.email} onChange={this.handleEmailChange} /*placeholder={this.state.email}*/ />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Email Confirmation</label>
                    <div className="col-sm-10">
                      <input className="form-control" value={this.state.emailConfirmation} onChange={this.handleEmailConfirmationChange} /*placeholder={this.state.email}*/ />
                    </div>


                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Password</label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" onChange={this.handlePasswordChange} />
                    </div>

                  </div>

                  <div>
                    <button id="submitUpdate" onClick={this.handleNewEmail} type="submit" className="btn btn-primary">change Email</button>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <button id="submitUpdate" onClick={this.deleteProfile} type="submit" className="btn btn-danger">Delete Profile</button>

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      
    )
  }
}

export default EditProfile;
