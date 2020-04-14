import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import axios from 'axios';
import { authHeader } from '../../helpers/authHeader';

import './EditProfile.scss';
import superheld from "../../superheld.png";
//import { userService } from '../../services/userService';
import { authenticationService } from "../../services/authentication.service"


class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    //this.handleAvatarChange = this.handleAvatarChange.bind(this);
    //this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    /* this.handlePinChange = this.handlePinChange.bind(this);
     this.handleKidCanPost = this.handleKidCanPost.bind(this);
 
     this.getProfile = this.getProfile.bind(this);*/
    this.state = {
      // avatar:'',
      //username: '',
      email: '',
      password: '',
      /*pin: '',
      kidCanPost: false*/
    };
  }

  // 
  /*componentDidMount() {
    const config = {
      headers: {
        Authorization: `Bearer ${authenticationService.currentUser.source._value}`
      }
    };
    axios.get('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id) // +this.props.match.params.id
      .then(response => {
        this.setState({

          password: response.data.password

        })
        console.log(this.email);
      })
      .catch(function (error) {
        console.log(error);
      })
  };*/

  handlePasswordChange(event){
    this.setState({ password: event.target.value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  tmpUpdate = async (event) => {

    try {
      event.preventDefault();
      await authenticationService.update(this.state.email);
    } catch (e) {
      console.log(e);
    }
  }

  updateProfile = async (event) => {

    //this.props.history.push('/');
    try {
      const newUserData = {
       // email: this.state.email,
       password: this.state.password

        //password: password
      };
      const config = {
        headers: {
          Authorization: `Bearer ${authenticationService.currentUser.source._value}`
        }
      }

      const response = await axios.put('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id, newUserData);

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  deleteProfile = async (event) => {

    try {

      const response = await axios.delete('http://localhost:3001/api/users/' + authenticationService.currentUserValue.user._id);
      authenticationService.logout();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  printSth() {

    //authenticationService.currentUser.source._value = "aaa";

    console.log(authenticationService.currentUser.source._value);

  }


  /* getProfile() {
       var self = this;
       axios.post('/getProfile', {
       })
           .then(function (response) {
               if (response) {
                   self.setState({ name: response.data.name });
               }
           })
           .catch(function (error) {
               console.log('error is ', error);
           });
   }*/

  render() {
    return (

      <div class="container bootstrap snippets">
        <div class="row">
          <div class="col-xs-12 col-sm-9">
            <form class="form-horizontal">
              <div class="panel panel-default">
                <div class="panel-body text-center">
                </div>
              </div>
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">Kid Section</h4>
                </div>
                <div class="panel-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Avatar</label>
                    <div class="col-sm-10">
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
                  <div class="form-group">
                    <label class="col-sm-2 control-label">PW</label>
                    <div class="col-sm-10">
                      <input type="password"
                        className="form-control"
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="col-sm-10 col-sm-offset-2">
                      <button id="submitUpdate" onClick={this.updateProfile} type="submit" class="btn btn-primary">Update password</button>
                      <button id="submitUpdate" onClick={this.deleteProfile} type="submit" class="btn btn-primary">Delete Profile</button>

                    </div>
                  </div>
                </div>
              </div>

              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">Parent Section</h4>
                </div>
                <div class="panel-body">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" disabled />
                    </div>
                    <div>
                      <button onClick={this.printSth} type="button" class="btn btn-secondary">Edit</button>
                    </div></div>

                  <div class="form-group">
                    <label class="col-sm-2 control-label">Password</label>
                    <div class="col-sm-10">
                      <input type="password" class="form-control" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
