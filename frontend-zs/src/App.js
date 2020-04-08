import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, Button, ButtonGroup, Image } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

import EditProfile from "./components/editProfile/EditProfile.component";
import Header from "./components/header/Header.component";

class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route path="/editProfile" component={EditProfile} />
      </Router>
    );
  }
}

export default App;
