import React from 'react';
import './App.scss';
import ProgressBar from './components/ProgressBar';
import Question from './components/Question';
import questions from './data/questions';
import outcomes from './data/outcomes';

const mostFrequent = arr => {
  arr = arr.filter(Boolean);
  let map = arr.map((a) => arr.filter((b) => a === b).length);
  return arr[map.indexOf(Math.max.apply(null, map))];
}

class App extends React.Component {
  state = {
    questionNumber: 0,
    answers: [],
    outcomes: [],
  }

  handleClick = (e) => {
    if (this.state.questionNumber < questions.length - 1) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        outcomes: [...this.state.outcomes, e.currentTarget.getAttribute('outcome')],
        answers: [...this.state.answers, e.currentTarget.id],
      })
    } else if (this.state.questionNumber === questions.length - 1) {
      this.setState({
        outcomes: [...this.state.outcomes, e.currentTarget.getAttribute('outcome')],
        answers: [...this.state.answers, e.currentTarget.id],
      });
      window.location.href = outcomes[mostFrequent(this.state.outcomes)];
    }
  }

  render() {
    const { questionNumber } = this.state;
    return (
      <div>
        <ProgressBar questionNumber={questionNumber} />
        <div className="container">
          <Question
            questions={questions}
            questionNumber={questionNumber}
            handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default App;
