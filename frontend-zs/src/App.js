import React, { Component } from 'react';

import Signup from "./components/signup/Signup.component";

class App extends Component {
  render() {
    return (
        <div style={{width: "400px"}}>
          <Signup />
        </div>
    );
  }
}

export default App;
