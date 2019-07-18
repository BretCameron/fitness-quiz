import React from 'react';
import './App.scss';
import ProgressBar from './components/ProgressBar';
import Question from './components/Question';
import questions from './data/questions';
import outcomes from './data/outcomes';
import uuid from 'uuid';

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const mostFrequent = arr => {
  arr = arr.filter(Boolean);
  let map = arr.map((a) => arr.filter((b) => a === b).length);
  return arr[map.indexOf(Math.max.apply(null, map))];
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const { startingQuestion, startingAnswers } = this.props;
    this.state = {
      questionNumber: Number(startingQuestion),
      answers: [...startingAnswers],
      outcomes: [],
    }
    this.formRef = React.createRef();
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
      }, this.handleSubmit);
      // this.formRef.current.submit();
      // setTimeout(this.handleSubmit(), 1000);
      window.location.href = outcomes[mostFrequent(this.state.outcomes)];
    }
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "result", ...this.state.answers })
    })
      .catch(error => alert(error));
  }

  render() {
    const { questionNumber, answers } = this.state;
    return (
      <div>
        <ProgressBar questionNumber={questionNumber} />
        <div className="container">
          <Question
            questions={questions}
            questionNumber={questionNumber}
            handleClick={this.handleClick} />
        </div>

        <form ref={this.formRef} name="result" method="POST" style={{ visibility: "visible" }} onSubmit={this.handleSubmit} hidden>
          <input type="hidden" name="form-name" value="result" />
          {questions.map((el, i) => {
            const key = uuid();
            return (
              <input key={key} type="text" name={i} value={answers[i]} readOnly />
            )
          })}
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default App;
