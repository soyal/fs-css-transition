import React, { Component } from 'react'
import FsCSSTransition from '../../src/index'
import classnames from 'classnames'
import './index.css'

class InverseOfControl extends Component {
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
        <FsCSSTransition in={this.state.show} timeout={3000} classNames="ioc">
          {(state, className) => {
            return (
              <div>
                <div className={classnames('ioc-box1', className)} />
                <div className={classnames('ioc-box2', className)} />
              </div>
            )
          }}
        </FsCSSTransition>
      </div>
    )
  }
}

export default InverseOfControl
