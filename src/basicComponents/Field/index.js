import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { ErrorMessage, useField } from 'formik'

const cx = classnames.bind(styles)

const propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
}

function Field(props) {
  const { label, type } = props
  const [field] = useField(props)

  return (
    <div className={cx('auth-field')}>
      <label htmlFor={field.name} className={cx('auth-field__label')}>
        {label}
      </label>
      <input id={field.name} className={cx('auth-field__input')} type={type} autoComplete='off' {...field} />
      <ErrorMessage name={field.name}>{message => <div className={cx('auth-field__error')}>{message}</div>}</ErrorMessage>
    </div>
  )
}

Field.propTypes = propTypes

export default Field
