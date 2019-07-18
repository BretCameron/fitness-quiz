import React, { Component } from 'react';
import uuid from 'uuid';

export default class Question extends Component {
  render() {
    const { questions, questionNumber, handleClick } = this.props;
    const { question, answers } = questions[questionNumber];
    return (
      <div>
        <h1 className="question" dangerouslySetInnerHTML={{ __html: question }}></h1>
        <div className="answer-grid">
          {answers.map(el => {
            const key = uuid();
            return (
              <button
                onClick={handleClick}
                type="button"
                key={key}
                id={el.answer}
                outcome={el.outcome}
              >{el.answer}</button>
            )
          })}
        </div>
      </div >
    )
  }
}
