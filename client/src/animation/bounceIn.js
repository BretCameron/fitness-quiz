import React, { Component } from 'react'
import { Motion, spring } from 'react-motion';


export default class BounceIn extends Component {
  render() {
    return (
      <Motion defaultStyle={{ x: 0 }} style={{ x: spring(1, { stiffness: 100, damping: 4 }) }}>
        {(value) => <div style={{
          transform: `scale(${value.x})`
        }}>{this.props.children}</div>}
      </Motion>
    )
  }
}
