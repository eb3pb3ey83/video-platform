import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Componennts
import Overlay, { propTypes as OverlayPropTypes } from '../Overlay'
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'
import Action from './components/Action'
import Body from './components/Body'
import Content, { propTypes as ContentPropTypes } from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

// Lib MISC
import { withModal } from './withModal'
import { ModalContext } from './context'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
const parsePixelToNumeber = value => Number(value.replace(/px$/, ''))

export const propTypes = {
  contentProps: PropTypes.object,
  isOpened: PropTypes.bool.isRequired,
  isClosable: PropTypes.bool.isRequired,
  isBackale: PropTypes.bool,
  isLoading: PropTypes.bool,
  shouldShowOverlayOnLoading: PropTypes.bool,
  shouldCloseOnOverlayClick: PropTypes.bool,
  beforeOpen: PropTypes.func,
  afterClose: PropTypes.func,
  onClose: PropTypes.func,
  onBack: PropTypes.func,
  appendTarget: OverlayPropTypes.appendTarget,
  size: ContentPropTypes.size,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any,
  forwardRef: PropTypes.any,
  type: PropTypes.string,
}

export const defaultProps = {
  isOpened: false,
  isClosable: true,
  isBackale: false,
  isLoading: false,
  shouldShowOverlayOnLoading: true,
  shouldCloseOnOverlayClick: false,
  onClose: () => null,
  onBack: () => null,
  appendTarget: document.body,
  size: 'md',
  type: 'default',
}

function Modal(props) {
  const {
    contentProps = {},
    isOpened,
    isClosable,
    isBackale,
    isLoading,
    shouldShowOverlayOnLoading,
    shouldCloseOnOverlayClick,
    onClose,
    onBack,
    appendTarget,
    size,
    width,
    style,
    className,
    children,
    forwardRef,
    type,
  } = props

  const ref = useRef(forwardRef || null)
  const [paddingVertical, setPaddingVertical] = useState(0)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)

  useEffect(() => {
    if (ref.current !== null) {
      const style = getComputedStyle(ref.current)
      const paddingVertical = parsePixelToNumeber(style.paddingTop) + parsePixelToNumeber(style.paddingBottom)

      setPaddingVertical(paddingVertical)
    }
  }, [paddingVertical, headerHeight, footerHeight])

  const context = {
    paddingVertical,
    headerHeight,
    footerHeight,
    setHeaderHeight,
    setFooterHeight,
  }

  return ReactDOM.createPortal(
    <ModalContext.Provider value={context}>
      <Overlay isShowed={isOpened} shouldCreatePortal={false} onClick={!isLoading && shouldCloseOnOverlayClick ? onClose : null} />
      <CSSTransition in={isOpened} timeout={300} classNames={getClassNames(cx, 'modal')} unmountOnExit>
        <div data-size={size} ref={ref} className={cx('modal', className)} style={{ ...style }}>
          <Content
            {...contentProps}
            style={{ ...contentProps.style, top, width, borderRadius: size === 'full' ? 'none' : '6px' }}
            data-size={size}
            type={type}
            shouldShowCloseButton={!isLoading && isClosable}
            shouldShowBackButton={!isLoading && isBackale}
            shouldShowLoadingIcon={isLoading}
            shouldShowLoadingOverlay={shouldShowOverlayOnLoading && isLoading}
            onClose={onClose}
            onBack={onBack}
          >
            {children}
          </Content>
        </div>
      </CSSTransition>
    </ModalContext.Provider>,
    appendTarget,
  )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

const ModalWithRef = React.forwardRef((props, ref) => <Modal {...props} forwardRef={ref} />)

ModalWithRef.Action = Action
ModalWithRef.Header = Header
ModalWithRef.Body = Body
ModalWithRef.Footer = Footer

export { withModal }
export default ModalWithRef
