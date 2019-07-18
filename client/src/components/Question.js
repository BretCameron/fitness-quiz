import React, { Component } from 'react';
import uuid from 'uuid';

export default class Question extends Component {

  render() {
    const { questions, questionNumber, handleClick } = this.props;
    const { question, description, answers } = questions[questionNumber];
    return (
      <div>
        <h1 className="question" dangerouslySetInnerHTML={{ __html: question }}></h1>
        <div className={answers.length === 2 ? 'answer-grid two-items' : answers.length === 3 ? 'answer-grid three-items' : 'answer-grid'}>
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
        <p className="question-description">{description}</p>
      </div>
    )
  }
}
