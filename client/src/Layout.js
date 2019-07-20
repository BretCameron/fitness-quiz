import React from 'react';
import App from './App';
import ProgressBar from './components/ProgressBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import questions from './data/questions';
import FadeIn from './animation/fadeIn';

export default class Layout extends React.Component {
  componentDidMount() {
    // document.getElementById('pre-render').style.display = 'none';
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return false;
  }

  render() {
    return (
      <Router>
        <FadeIn>
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
        </FadeIn>
        <Route path="/progress/gender"
          render={(props) => (
            <ProgressBar {...props}
              questionNumber="0"
              shouldComponentUpdate="false"
            />
          )} />
        <Route path="/progress/result"
          render={(props) => (
            <ProgressBar {...props}
              questionNumber={questions.length + 1}
              shouldComponentUpdate="false"
            />
          )} />
      </Router>
    )
  }
}
