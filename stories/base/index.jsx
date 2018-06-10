import React, { Component } from 'react'
import FsCSSTransition from '../../src/index'

import './index.css'

class BaseDemo extends Component {
  state = {
    show: true
  }

  toggleShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleShow}>click</button>
        <FsCSSTransition in={this.state.show} timeout={300} classNames="fade">
          <div className="box">base demo</div>
        </FsCSSTransition>
      </div>
    )
  }
}

export default BaseDemo
