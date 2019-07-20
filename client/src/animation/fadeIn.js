import React, { Component } from 'react'
import { Motion, spring } from 'react-motion';


export default class FadeIn extends Component {
  render() {
    return (
      <Motion defaultStyle={{ opacity: 0 }} style={{ opacity: spring(1, { stiffness: 120, damping: 20 }) }}>
        {(value) => <div style={value}>{this.props.children}</div>}
      </Motion>
    )
  }
}
