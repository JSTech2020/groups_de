import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";


import EditProfile from "./components/editProfile/EditProfile.component";
import Header from "./components/header/Header.component";
import RegistrationStepTwo from './components/registrationStepTwo/RegistrationStepTwo.component';


class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/registrationStepTwo" component={RegistrationStepTwo} />
      </Router>
    );
  }
}

export default App;
