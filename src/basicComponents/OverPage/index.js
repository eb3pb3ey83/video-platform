import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import classnames from 'classnames/bind'

// Components
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { withOverPage } from './withOverPage'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isOpened: PropTypes.bool.isRequired,
  beforeOpen: PropTypes.func,
  afterClose: PropTypes.func,
  onClose: PropTypes.func,
  closeButtonPosition: PropTypes.shape({
    top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  closeIcon: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  appendTarget: PropTypes.instanceOf(Element),
  forwardRef: PropTypes.any,
}

export const defaultProps = {
  isOpened: false,
  onClose: () => null,
  appendTarget: document.body,
  closeIcon: <Icon.Cross role='light' />,
}

function OverPage(props) {
  const { isOpened, onClose, closeButtonPosition, closeIcon, style, className, children, appendTarget, forwardRef } = props

  return ReactDOM.createPortal(
    <CSSTransition in={isOpened} timeout={300} classNames={getClassNames(cx, 'home-over-page')} unmountOnExit>
      <div ref={forwardRef} className={cx('home-over-page', className)} style={{ ...style, top }}>
        {React.createElement('button', {
          className: cx('home-over-page__button-close'),
          style: closeButtonPosition,
          onClick: onClose,
          children: closeIcon,
        })}

        {children}
      </div>
    </CSSTransition>,
    appendTarget,
  )
}

OverPage.propTypes = propTypes
OverPage.defaultProps = defaultProps

const OverPageWithRef = React.forwardRef((props, ref) => <OverPage {...props} forwardRef={ref} />)

export { withOverPage }
export default OverPageWithRef
