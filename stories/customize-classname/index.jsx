import React, { Component } from 'react'
import FsCSSTransition from '../../src/index'

import './index.css'

class Customize extends Component {
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
        <FsCSSTransition
          in={this.state.show}
          timeout={300}
          classNames={{
            enter: 'fade-c-enter',
            enterActive: 'fade-c-enter-active',
            enterDone: 'fade-c-enter-done',
            exit: 'fade-c-exit',
            exitActive: 'fade-c-exit-active',
            exitDone: 'fade-c-exit-done'
          }}
        >
          <div className="box">base demo</div>
        </FsCSSTransition>
      </div>
    )
  }
}

export default Customize
