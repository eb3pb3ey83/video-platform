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
  isViewMode: PropTypes.bool,
  maxHeight: PropTypes.number,
  nameWidth: PropTypes.number,
  marginBottom: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
}

const defaultProps = {
  isViewMode: false,
  marginBottom: 24,
  nameWidth: 130,
}

const getStyle = (marginBottomClass, marginBottom) => {
  return `
    .${marginBottomClass}[data-is-view-mode="false"]:not(:last-of-type) {
      margin-bottom: ${marginBottom}px;
    }
  `
}

function FormItem(props) {
  const { name, nameWidth, marginBottom, children, isViewMode, maxHeight } = props
  const marginBottomClass = cx(`margin-bottom-${uniqueId()}`)

  return (
    <>
      <style>{getStyle(marginBottomClass, marginBottom)}</style>
      <div style={{ gridTemplateColumns: `${nameWidth}px auto` }} className={cx('form-item', marginBottomClass)} data-is-view-mode={isViewMode}>
        <div style={{ maxHeight }} className={cx('form-item__name')} data-is-view-mode={isViewMode}>
          <Typography.Text color='primary-darkest'>{name}</Typography.Text>
        </div>
        <div>{children}</div>
      </div>
    </>
  )
}

FormItem.propTypes = propTypes
FormItem.defaultProps = defaultProps

export default FormItem
