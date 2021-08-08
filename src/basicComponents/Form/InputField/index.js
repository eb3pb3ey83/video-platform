import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import Input from '@/basicComponents/Input'
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  isOnlyNumber: PropTypes.bool,
  onChange: PropTypes.func,
}

export const defaultProps = { size: 'md', isOnlyNumber: false, onChange: () => {} }

function InputField(props) {
  const { name, size, isOnlyNumber, onChange: onChangeProps, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const onChange = event => {
    const value = event.target.value

    const numberRex = /^[0-9]*$/g
    const isNumber = value.match(numberRex)

    // 限制 input 只能輸入數字
    if (isOnlyNumber && !isNumber) return

    setFieldValue(field.name, value)
    onChangeProps(value)
  }

  return (
    <div className={cx('input-field-wrapper')}>
      <Input {...restProps} onChange={onChange} value={field.value} name={name} />
      <ErrorMessage name={name} size={size} />
    </div>
  )
}

InputField.propTypes = propTypes
InputField.defaultProps = defaultProps

export default InputField
