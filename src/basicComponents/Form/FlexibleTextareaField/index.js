import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useFormikContext, useField } from 'formik'
import styles from './style.module.scss'

// Components
import FlexibleTextarea from '@/basicComponents/FlexibleTextarea'
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  wrapperClassName: PropTypes.string,
  style: PropTypes.object,
}

export const defaultProps = { height: 40 }

function FlexibleTextareaField(props) {
  const { name, size, style, wrapperClassName, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const onChange = event => {
    const value = event.target.value

    setFieldValue(field.name, value)
  }

  return (
    // 一直吃不到 style，暫時用 inline style 寫
    <div className={cx('flexible-textarea-wrapper', wrapperClassName)}>
      <FlexibleTextarea {...restProps} onChange={onChange} value={field.value || ''} />
      <ErrorMessage name={name} size={size} />
    </div>
  )
}

FlexibleTextareaField.propTypes = propTypes
FlexibleTextareaField.defaultProps = defaultProps

export default FlexibleTextareaField
