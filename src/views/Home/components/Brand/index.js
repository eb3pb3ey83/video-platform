import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'

// Assets

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  withText: PropTypes.bool,
  withPadding: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
}

function Brand(props) {
  const { withText, withPadding, style, className, ...restProps } = props

  const paddingHorizontal = 22
  const paddingVertical = 18

  return (
    <div
      className={cx('home-brand', className)}
      style={{ ...style, padding: withPadding ? `${paddingVertical}px ${paddingHorizontal}px` : null }}
      {...restProps}
    >

      <CSSTransition in={withText} timeout={300} classNames={getClassNames(cx, 'home-brand-content')}>
        Logo
      </CSSTransition>
    </div>
  )
}

Brand.propTypes = propTypes

export default Brand
