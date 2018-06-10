## fs-css-transition
解决react-transition-group CSSTransition无法同时定制多个css动画的问题

### 基础示例
基础用法与CSSTransition一致
```javascript
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
```
classNames可以为string也可以为object,同CSSTransition一致

### 同时控制多个动画
与CSSTransition不同的是，如果children为function，FsCSSTransition会将相应的类名回传回来
```javascript
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

```
相应的样式为
```css
.ioc-box1 {
  width: 100px;
  height: 100px;
  background: #59c;
}
.ioc-box1.ioc-enter {
  opacity: 0;
}
.ioc-box1.ioc-enter-active {
  opacity: 1;
  transition: all 3s ease-in-out;
}
.ioc-box1.ioc-exit {
  opacity: 1;
}
.ioc-box1.ioc-exit-active {
  opacity: 0;
  transition: all 3s ease-in-out;
}

.ioc-box2 {
  position: relative;
  width: 100px;
  height: 100px;
  background: #98c;
}
.ioc-box2.ioc-enter {
  left: 3000px;
}
.ioc-box2.ioc-enter-active {
  left: 0;
  transition: left 3s ease-in-out
}
.ioc-box2.ioc-exit {
  left: 0;
}
.ioc-box2.ioc-exit-active {
  left: 3000px;
  transition: left 3s ease-in-out;
}

```
