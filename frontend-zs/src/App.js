import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login.component";
import EditProfile from "./components/editProfile/EditProfile.component";
import Header from "./components/header/Header.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/login" component={Login} />

      </Router>
    );
  }
}

export default App;
