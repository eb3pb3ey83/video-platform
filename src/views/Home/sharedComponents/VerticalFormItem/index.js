import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import { uniqueId } from 'lodash'

// Components
import Typography from '@/basicComponents/Typography'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.string,
  marginBottom: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
}

const defaultProps = {
  isViewMode: false,
  marginBottom: 12,
  width: 'auto',
}

const getStyle = (marginBottomClass, marginBottom) => {
  return `
    .${marginBottomClass}:not(:last-of-type) {
      margin-bottom: ${marginBottom}px;
    }
  `
}

function VerticalFormItem(props) {
  const { title, width, marginBottom, children } = props
  const marginBottomClass = cx(`margin-bottom-${uniqueId()}`)

  return (
    <>
      <style>{getStyle(marginBottomClass, marginBottom)}</style>
      <div className={cx('vertical-form-item', marginBottomClass)} style={{ width }}>
        <Typography.Text className={cx('vertical-form-item__title')} color='primary-darkest'>
          {title}
        </Typography.Text>
        {children}
      </div>
    </>
  )
}

VerticalFormItem.propTypes = propTypes
VerticalFormItem.defaultProps = defaultProps

export default VerticalFormItem
