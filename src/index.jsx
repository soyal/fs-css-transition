import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FsCSSTransition extends Component {
  static propTypes = {
    in: PropTypes.bool, // 是否显示
    timeout: PropTypes.number.isRequired, // 用于估算动画完成时间
    children: PropTypes.any, // 可以是ReactNode或者function
    classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired // 类名,可以为string或者object
  }

  static defaultProps = {
    in: false
  }

  // 每个状态对应的类名
  static STATUS_CLS = {
    start: {
      exited: '*-enter',
      entered: '*-exit'
    },
    active: {
      exiting: '*-exit-active',
      entering: '*-enter-active'
    },
    done: {
      exited: '*-exit-done',
      entered: '*-enter-done'
    }
  }

  doneTimer = null // start --> done的结束定时

  constructor(props) {
    super(props)

    if (!props.timeout) {
      throw new Error('fs-css-transition need param timeout')
    }

    this.state = {
      status: 'exited',
      className: '',
      stage: 'done'
    }
  }

  /**
   * 获取状态在相应阶段的类名
   * @param {string} status 状态名 e.g entered entering ...
   * @param {string} stage 阶段名 start(开始阶段) active(运行阶段) done(结束阶段)
   */
  getClassName(status, stage) {
    const classNames = this.props.classNames
    // classNames是字符串
    if (typeof classNames === 'string') {
      const rawCls = FsCSSTransition.STATUS_CLS[stage][status]
      return rawCls.replace('*', classNames)
      // classNames是object
    } else {
      if (stage === 'start') {
        return status === 'exited' ? classNames.enter : classNames.exit
      } else if (stage === 'active') {
        return status === 'entering'
          ? classNames.enterActive
          : classNames.exitActive
      } else {
        return status === 'exited' ? classNames.exitDone : classNames.enterDone
      }
    }
  }

  /**
   * 切换状态
   * @param {string} action 动作 show || hide
   */
  statusTransition(action) {
    const stage = 'start'
    let status = ''
    // 由hide --> show
    if (action === 'show') {
      status = 'exited'
      // 由show --> hide
    } else {
      status = 'entered'
    }
    const className = this.getClassName(status, stage)

    this.setState(
      {
        status,
        className: className,
        stage
      },
      () => {
        this.setActiveState()
        this.setDoneState()
      }
    )
  }

  setActiveState = () => {
    setTimeout(() => {
      const status = this.state.status === 'exited' ? 'entering' : 'exiting'
      const stage = 'active'
      this.setState({
        status,
        className: this.getClassName(status, 'active'),
        stage
      })
    }, 0)
  }

  setDoneState = () => {
    window.clearTimeout(this.doneTimer)
    this.doneTimer = setTimeout(() => {
      const status = this.state.status === 'entering' ? 'entered' : 'exited'
      const stage = 'done'
      this.setState({
        status,
        className: this.getClassName(status, stage),
        stage
      })
    }, this.props.timeout)
  }

  /* eslint-disable */
  UNSAFE_componentWillReceiveProps(nProps) {
    if (nProps.in !== this.props.in) {
      this.statusTransition(nProps.in ? 'show' : 'hide')
    }
  }

  componentDidMount() {
    if (this.props.in) {
      this.statusTransition('show')
    }
  }

  render() {
    const { className, status, stage } = this.state

    if (status === 'exited' && stage === 'done') return null

    return <div className={className}>{this.props.children}</div>
  }
}

export default FsCSSTransition
