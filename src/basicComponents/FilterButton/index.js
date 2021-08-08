import React from 'react'
import classnames from 'classnames/bind'

// Components
import Button, { propTypes as ButtonPropTypes, defaultProps as ButtonDefaultProps } from '@/basicComponents/Button'
import Group from './components/Group'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = ButtonPropTypes

export const defaultProps = ButtonDefaultProps

function FilterButton(props) {
  const { className, size, ...restProps } = props

  return <Button {...restProps} className={cx('home-filter-button', className)} shape='rounded' size={size} />
}

FilterButton.propTypes = propTypes
FilterButton.defaultProps = defaultProps

FilterButton.Group = Group

export default FilterButton
