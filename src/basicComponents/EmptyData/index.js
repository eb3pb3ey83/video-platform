// Libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
// import Icon from '@/basicComponents/Icon'
import Typography from '../Typography/components/Typography'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  noDataText: PropTypes.string,
  icon: PropTypes.object,
}

// DefaultProps
function EmptyData(props) {
  const { noDataText, icon } = props

  return (
    <div className={cx('empty-data')}>
      <div>{icon}</div>
      <Typography.Text size='md' color='primary-darkest'>
        {noDataText}
      </Typography.Text>
    </div>
  )
}

EmptyData.propTypes = propTypes

export default EmptyData
