import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
// import Icon from '../Icon'
import Icon from '@/basicComponents/Icon'

// Styles
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  shouldShowCloseButton: PropTypes.bool.isRequired,
  shouldShowBackButton: PropTypes.bool.isRequired,
  shouldShowLoadingIcon: PropTypes.bool.isRequired,
  shouldShowLoadingOverlay: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onBack: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
  forwardRef: PropTypes.any,
  type: PropTypes.string,
}

function Content(props) {
  const {
    shouldShowCloseButton,
    shouldShowBackButton,
    shouldShowLoadingIcon,
    shouldShowLoadingOverlay,
    onClose,
    onBack,
    style,
    className,
    children,
    forwardRef,
    type,
    ...restProps
  } = props

  return (
    <div className={cx('modal-content', className)} style={style} {...restProps}>
      {shouldShowLoadingOverlay && <div className={cx('modal-content__loading-overlay')} />}
      {shouldShowCloseButton && !shouldShowBackButton && (
        <button className={cx('modal-content__icon-wrapper', 'modal-content__icon-wrapper--cross')} onClick={onClose}>
          <Icon.Cross role={type === 'danger' ? 'light' : 'default'} />
        </button>
      )}
      {children}
    </div>
  )
}

Content.propTypes = propTypes

export default Content
