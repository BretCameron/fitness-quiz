import React, { Component } from 'react'

export default class ProgressBar extends Component {
  render() {

    const data = ['Gender', 'Age', 'Fitness', 'Training', 'Results'];

    return (
      <div className="progress-bar">
        <div className="container">
          <div className="progress-grid">
            {data.map((el, i) => {
              const { questionNumber } = this.props;
              return (
                <div>
                  <p className="progress-name">{el}</p>
                  <div className={`progress
              ${i === 0 ? ' first' : i === data.length - 1 ? ' last' : ''}
              ${i === questionNumber + 1 ? ' current' : i < questionNumber + 1 ? ' complete' : ''}`} />
                  <div className={`progress-triangle ${i === questionNumber + 1 ? ' current' : ''}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
