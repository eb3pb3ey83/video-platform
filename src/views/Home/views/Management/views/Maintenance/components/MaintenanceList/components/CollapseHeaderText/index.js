import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '@/basicComponents/Typography'

// Style
import styles from './style.module.scss'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

function CollapseHeaderText(props) {
  const { title, description } = props

  return (
    <div className={cx('header')}>
      <Typography.Text level='h5' lineHeight={2} color='gray-darker'>
        {title}
      </Typography.Text>
      <Typography.Text level='h5' lineHeight={2} color='warn' size='xs' className={cx('header-description')}>
        {description}
      </Typography.Text>
    </div>
  )
}

CollapseHeaderText.propTypes = propTypes

export default CollapseHeaderText
