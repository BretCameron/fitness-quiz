import React from 'react';
import uuid from 'uuid';

export default class ProgressBar extends React.PureComponent {
  render() {

    const data = {
      'Gender': require('../images/gender.svg'),
      'Age': require('../images/age.svg'),
      'Fitness': require('../images/fitness.svg'),
      'Training': require('../images/training.svg'),
      'Results': require('../images/results.svg')
    };

    return (
      <div className="progress-bar">
        <div className="container">
          <div className="progress-grid">
            {Object.keys(data).map((el, i) => {
              const { questionNumber } = this.props;
              const key = uuid();
              return (
                <div key={key}>
                  <img className="progress-icon" src={data[el]} alt={el} />
                  <p className="progress-name">{el}</p>
                  <div className={`progress
              ${i === 0 ? ' first' : i === Object.keys(data).length - 1 ? ' last' : ''}
              ${i === Number(questionNumber) ? ' current' : i < Number(questionNumber) ? ' complete' : ''}`}>
                  </div>
                  <div className={`progress-triangle ${i === Number(questionNumber) ? ' current' : ''}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
