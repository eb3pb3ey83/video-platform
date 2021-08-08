import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import MultiCreateInput from '@/basicComponents/MultiCreateInput'
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
}

export const defaultProps = {
  size: 'md',
  onChange: () => {},
}

function MultiCreateInputField(props) {
  const { name, size, onChange: onChangeProps, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const handleChange = value => {
    const valueList = value.map(item => item.value)

    setFieldValue(field.name, valueList)
  }

  const handleKeyDown = value => {
    const valueList = value.map(item => item.value)

    setFieldValue(field.name, valueList)
    onChangeProps()
  }

  return (
    <div className={cx('multi-create-input-field-wrapper')}>
      <MultiCreateInput handleKeyDownProps={handleKeyDown} handleChangeProps={handleChange} value={field.value} {...restProps} />
      <ErrorMessage name={name} size={size} />
    </div>
  )
}

MultiCreateInputField.propTypes = propTypes
MultiCreateInputField.defaultProps = defaultProps

export default MultiCreateInputField
