import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const defaultProps = {
  title: '',
  name: '',
  hasSort: false,
  onSortClick: () => {},
  sortBy: '',
  isDescending: null,
}

export const propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  hasSort: PropTypes.bool,
  onSortClick: PropTypes.func,
  sortBy: PropTypes.string,
  isDescending: PropTypes.bool,
}

function Title(props) {
  const { title, name, hasSort, onSortClick, sortBy, isDescending, ...restProps } = props

  const isSorting = hasSort && name === sortBy

  const isNotSorting = hasSort && !isSorting
  const isSortingByDescend = hasSort && isSorting && isDescending === true
  const isSortingByAscend = hasSort && isSorting && isDescending === false
  const isSortingByNull = hasSort && isSorting && isDescending === null

  return (
    <div className={cx('table-title-wrapper')}>
      <p className={cx('table-title-wrapper__title')}> {title}</p>
      {isNotSorting && <Icon.Sort className={cx('table-title-wrapper__sort')} data-sort={name} onClick={onSortClick} {...restProps} />}
      {isSortingByNull && <Icon.Sort className={cx('table-title-wrapper__sort')} data-sort={name} onClick={onSortClick} {...restProps} />}
      {isSortingByDescend && <Icon.DescendSort className={cx('table-title-wrapper__sort')} data-sort={name} onClick={onSortClick} {...restProps} />}
      {isSortingByAscend && <Icon.AscendSort className={cx('table-title-wrapper__sort')} data-sort={name} onClick={onSortClick} {...restProps} />}
    </div>
  )
}

Title.propTypes = propTypes
Title.defaultProps = defaultProps

export default Title
