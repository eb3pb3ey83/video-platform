import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  gridArea: PropTypes.string,
  isEditMode: PropTypes.bool,
}

function MediaInfoColumn(props) {
  const { children, className, gridArea, isEditMode } = props

  return (
    <div data-grid-area={gridArea} data-is-edit-mode={isEditMode} className={cx('media-info__column', className)}>
      {children}
    </div>
  )
}

MediaInfoColumn.propTypes = propTypes

export default MediaInfoColumn
