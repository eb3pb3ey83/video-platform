// Libs
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
  label: PropTypes.string,
  group: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  groupLength: 0,
  onChange: () => {},
}

const RadioGroupField = React.forwardRef((props, ref) => {
  const { children, className, label, group, disabled, onChange } = props

  const RadioGroupChildren = React.Children.map(children, child => {
    return React.cloneElement(child, {
      group,
      disabled,
      onChangeProps: onChange,
    })
  })

  return (
    <>
      <div className={cx('radio-group', className)}>
        {label && (
          <div className={cx('radio-group-label')}>
            <p className={cx('radio-group-label__text')}>{label}</p>
          </div>
        )}
        <div className={cx('radio-group-list')}>{RadioGroupChildren}</div>
        <ErrorMessage name={group} />
      </div>
    </>
  )
})

RadioGroupField.propTypes = propTypes
RadioGroupField.defaultProps = defaultProps

export default RadioGroupField
