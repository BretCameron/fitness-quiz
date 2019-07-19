import React from 'react';
import './App.scss';
import ProgressBar from './components/ProgressBar';
import Question from './components/Question';
import Footer from './components/Footer';
import questions from './data/questions';
import outcomes from './data/outcomes';
import uuid from 'uuid';

let height, submitForm = false;

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


  componentDidMount() {
    window.onload = () => this.sendPostMessage();
    window.onresize = () => this.sendPostMessage();
    window.onmessage = (e) => {
      if (e.data.useIframe) {
        require('./iframe.scss');
      };
    }
  }

  sendPostMessage = () => {
    if (height !== document.querySelector('main').offsetHeight) {
      height = document.querySelector('main').offsetHeight + 30;
      window.parent.postMessage({
        frameHeight: height
      }, '*');
    }
  }

  handleClick = (e) => {
    if (this.state.questionNumber < questions.length - 1) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        outcomes: [...this.state.outcomes, e.currentTarget.getAttribute('outcome')],
        answers: [...this.state.answers, e.currentTarget.id],
      }, this.sendPostMessage);
    } else if (this.state.questionNumber === questions.length - 1) {
      this.setState({
        outcomes: [...this.state.outcomes, e.currentTarget.getAttribute('outcome')],
        answers: [...this.state.answers, e.currentTarget.id],
      }, this.handleSubmit);
    }
  }

  handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (submitForm) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "result", ...this.state.answers })
      })
        .then(() => {
          window.top.location.href = outcomes[mostFrequent(this.state.outcomes)];
        })
        .catch(error => alert(error));
    } else {
      window.top.location.href = outcomes[mostFrequent(this.state.outcomes)];
    }
  }

  render() {
    const { questionNumber, answers } = this.state;
    return (
      <div id="document">
        <main>
          <ProgressBar questionNumber={questionNumber} />
          <div className="container">
            <Question
              questions={questions}
              questionNumber={questionNumber}
              handleClick={this.handleClick}
            />
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
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
