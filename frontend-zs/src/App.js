import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login/Login.component";
import EditProfile from "./components/editProfile/EditProfile.component";
import StoryList from "./components/stories/StoryList.component"
import Header from "./components/header/Header.component";
import { PrivateRoute } from './components/PrivateRoute';
import { authenticationService } from "./services/authentication.service";
import Signup from "./components/signup/Signup.component";
import Feed from "./components/feed/Feed.component";

const UserContext = React.createContext({
  user: null
});

function reducer(state, action) {
  switch (action.type) {
  }
}

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
      <UserContext.Provider>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute path="/editProfile" exact component={EditProfile} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path="/stories" component={StoryList} />
            <Route path="/mitreden" component={Feed} />
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
