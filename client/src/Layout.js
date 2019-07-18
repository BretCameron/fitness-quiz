import React, { Component } from 'react';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact
            render={(props) => (
              <App {...props}
                startingQuestion="0"
                startingAnswers={[]}
                startingOutcomes={[]}
              />
            )} />
          <Route path="/male"
            render={(props) => (
              <App {...props}
                startingQuestion="1"
                startingAnswers={["Male"]}
                startingOutcomes={[]}
              />
            )} />
          <Route path="/female"
            render={(props) => (
              <App {...props}
                startingQuestion="1"
                startingAnswers={["Female"]}
                startingOutcomes={[]}
              />
            )} />
        </Router>
      </div>
    )
  }
}
