// Libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { ErrorMessage as ErrorMessageComponent } from 'formik'

// Components

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  isShowBorder: PropTypes.bool,
  name: PropTypes.string,
  size: PropTypes.string,
  wrapperClassName: PropTypes.string,
  errorMessageClassName: PropTypes.string,
}

// DefaultProps
export const defaultProps = {
  isShowBorder: true,
  onChange: () => {},
  size: 'md',
}

const ErrorMessage = React.memo(props => {
  const { name, size, isShowBorder, wrapperClassName, errorMessageClassName } = props

  return (
    <ErrorMessageComponent name={name}>
      {message => (
        <div className={cx('error-message', wrapperClassName)}>
          <div data-is-show-border={isShowBorder} className={cx('error-message__border')} data-size={size} />
          <div className={cx('error-message__text', errorMessageClassName)}>{message}</div>
        </div>
      )}
    </ErrorMessageComponent>
  )
})

ErrorMessage.propTypes = propTypes
ErrorMessage.defaultProps = defaultProps

export default ErrorMessage
