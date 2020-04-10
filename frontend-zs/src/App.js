import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";

import StoryList from "./components/stories/StoryList.component"
import EditProfile from "./components/editProfile/EditProfile.component";
import Header from "./components/header/Header.component";


class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/lesen" component={StoryList} />
        <Header></Header>
        <Route path="/editProfile" component={EditProfile} />
        <Route path="/lesen" component={StoryList} />
      </Router>
    );
  }
}

export default App;
