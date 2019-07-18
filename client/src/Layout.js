import React, { Component } from 'react';
import App from './App';
import ProgressBar from './components/ProgressBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import questions from './data/questions';

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
          <Route path="/progress/gender"
            render={(props) => (
              <ProgressBar {...props}
                questionNumber="0"
              />
            )} />
          <Route path="/progress/result"
            render={(props) => (
              <ProgressBar {...props}
                questionNumber={questions.length}
              />
            )} />
        </Router>
      </div>
    )
  }
}
