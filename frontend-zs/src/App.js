import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

//import LandingPage from "./components/landing-page/Landing-page.component";
import Header from "./components/header/Header.component";

class App extends Component {
  render() {
    return (
      <Header></Header>
    )  
  }
}

export default App;
