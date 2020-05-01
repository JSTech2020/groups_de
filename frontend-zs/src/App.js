import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';

import Login from "./components/login/Login.component";
import EditProfile from "./components/editProfile/EditProfile.component";
import StoryList from "./components/stories/StoryList";
import StoryPage from "./components/stories/StoryPage"
import Header from "./components/header/Header.component";
import RegistrationStepTwo from './components/registrationStepTwo/RegistrationStepTwo.component';
import { PrivateRoute } from './components/PrivateRoute';
import { authenticationService } from "./services/authentication.service";
import Signup from "./components/signup/Signup.component";
import Feed from "./components/feed/Feed.component";
import { ProjectsList } from './components/projects/Home/Main';
import CreatePost from './components/createPost/CreatePost.component';
import { SingleProject } from './components/projects/SingleProject/Main';
import VerifyAccount from './components/verifyAccount/VerifyAccount.component';
import Post from "./components/post/Post.component"
import LandingPage from "./components/landingPage/LandingPage.component";

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
            {!authenticationService.isAuthenticated() &&
              <Route path='/' exact component={LandingPage}/>
            }
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute path="/createPost" component={CreatePost} />
            <PrivateRoute path="/editProfile" component={EditProfile} />
            <PrivateRoute path="/registrationStepTwo" component={RegistrationStepTwo} />
            <PrivateRoute path='/projects/:id' component={SingleProject} />
            <PrivateRoute path='/projects' component={ProjectsList} />
            <PrivateRoute path="/stories" component={StoryList} />
            <Route path="/mitreden" component={Feed} />
            <Route path="/post/:id" children={<PostRedirect/>}/>
            <PrivateRoute path='/stories' component={StoryList} />
            <PrivateRoute path='/story/:id' component={StoryPage} />
            <Route path="/verify/:token" component={VerifyAccount} />
          </Switch>
        </Router>
      </UserContext.Provider>
    );
  }
}
function PostRedirect(){
  let {id} = useParams();
  return <Post id={id}/>
}
export default App;
