import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import StoryList from "./components/stories/StoryList.component"

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/stories" component={StoryList} />
        </div>
      </Router>
    );
  }
}

export default App;
