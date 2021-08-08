import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { autobind } from 'react-decoration'
import classnames from 'classnames/bind'

// Components
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'

// Lib MISC
import DomAlign, { PLACEMENTS } from '@/utils/dom-align'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isOpened: PropTypes.bool.isRequired,
  content: PropTypes.any.isRequired,
  onOuterAction: PropTypes.func,
  placements: PropTypes.shape({
    targetPlacementX: PropTypes.oneOf([PLACEMENTS.LEFT, PLACEMENTS.RIGHT, PLACEMENTS.CENTER]),
    targetPlacementY: PropTypes.oneOf([PLACEMENTS.TOP, PLACEMENTS.BOTTOM, PLACEMENTS.CENTER]),
    sourcePlacementX: PropTypes.oneOf([PLACEMENTS.LEFT, PLACEMENTS.RIGHT, PLACEMENTS.CENTER]),
    sourcePlacementY: PropTypes.oneOf([PLACEMENTS.TOP, PLACEMENTS.BOTTOM, PLACEMENTS.CENTER]),
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }).isRequired,
  appendTarget: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.object]).isRequired,
  targetElement: PropTypes.instanceOf(Element),
  shouldOuterActionEmitOnSourceAction: PropTypes.bool,
  shouldOuterActionEmitOnTargetAction: PropTypes.bool,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export const defaultProps = {
  isOpened: false,
  onOuterAction: () => null,
  placements: {
    targetPlacementX: PLACEMENTS.LEFT,
    targetPlacementY: PLACEMENTS.BOTTOM,
    sourcePlacementX: PLACEMENTS.LEFT,
    sourcePlacementY: PLACEMENTS.TOP,
    offsetX: 0,
    offsetY: 0,
  },
  shouldOuterActionEmitOnSourceAction: false,
  shouldOuterActionEmitOnTargetAction: false,
  appendTarget: document.body,
}

class Trigger extends Component {
  constructor(props) {
    super(props)

    const { isOpened } = props

    this.state = {
      isExited: !isOpened, // for animation-dependent rendering, should trigger close/open?
      isExiting: false,
      isToggled: isOpened, // for business logic tracking, should trigger close/open?
    }

    this.triggerRef = React.createRef()
    this.isAnimating = false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const willOpen = !prevState.isToggled && nextProps.isOpened
    const willClose = prevState.isToggled && !nextProps.isOpened

    let newState = null

    if (willOpen) {
      newState = { isToggled: true, isExited: false, isExiting: false }
    } else if (willClose) {
      newState = { isToggled: false, isExiting: true }
    }

    return newState
  }

  componentDidMount() {
    const { isOpened, targetElement } = this.props

    this.targetElement = targetElement || ReactDOM.findDOMNode(this)
    this.sourceElement = this.triggerRef.current

    if (isOpened) {
      this.enter()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { targetElement } = this.props
    const { isToggled } = this.state
    const didOpen = !prevState.isToggled && isToggled
    const didClose = prevState.isToggled && !isToggled

    if (didOpen || didClose) {
      this.targetElement = targetElement || ReactDOM.findDOMNode(this)
      this.sourceElement = this.triggerRef.current
    }

    if (didOpen) {
      this.enter()
    } else if (didClose) {
      this.exit()
    }
  }

  componentWillUnmount() {
    this.exit()
  }

  // Private methods
  @autobind
  enter() {
    this.alignElements()

    document.addEventListener('touchstart', this.handleOuterAction, { useCapture: true })
    document.addEventListener('mousedown', this.handleOuterAction, { useCapture: true })
  }

  @autobind
  exit() {
    document.removeEventListener('touchstart', this.handleOuterAction, { useCapture: true })
    document.removeEventListener('mousedown', this.handleOuterAction, { useCapture: true })
  }

  @autobind
  alignElements() {
    const { placements } = this.props

    DomAlign.element(this.targetElement, this.sourceElement, { ...defaultProps.placements, ...placements })
  }

  // Handlers
  @autobind
  handleOuterAction(event) {
    const { onOuterAction, shouldOuterActionEmitOnSourceAction, shouldOuterActionEmitOnTargetAction } = this.props

    const shouldEmitOuterAction =
      !this.isAnimating &&
      (shouldOuterActionEmitOnSourceAction || !this.sourceElement.contains(event.target)) &&
      (shouldOuterActionEmitOnTargetAction || !this.targetElement.contains(event.target))

    if (shouldEmitOuterAction) {
      onOuterAction(event)
    }
  }

  // Events
  @autobind
  onStart() {
    this.isAnimating = true
  }

  @autobind
  onRest() {
    const { isToggled } = this.state
    this.isAnimating = false

    if (!isToggled) {
      this.setState({ isExited: true, isExiting: false })
    }
  }

  // Renderers
  @autobind
  renderTrigger() {
    const { isOpened, content, className, style } = this.props

    return (
      <CSSTransition in={isOpened} timeout={500} classNames={getClassNames(cx, 'trigger')} unmountOnExit>
        <div style={style} className={className} ref={this.triggerRef}>
          {content}
        </div>
      </CSSTransition>
    )
  }

  render() {
    const { appendTarget, children } = this.props

    return [children, ReactDOM.createPortal(this.renderTrigger(), appendTarget)]
  }
}

Trigger.propTypes = propTypes
Trigger.defaultProps = defaultProps

export { PLACEMENTS }
export default Trigger
