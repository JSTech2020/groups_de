import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login.component";
import EditProfile from "./components/editProfile/EditProfile.component";
import Header from "./components/header/Header.component";
import Signup from "./components/signup/Signup.component";
import {authenticationService} from "./services/authentication.service";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null }
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(u => this.setState({ currentUser: u }));
  }

  render() {
    return (
      <Router>
        <Header />
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
