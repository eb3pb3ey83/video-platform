// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'

// Components
import Select from '@/basicComponents/Select'
import ErrorMessage from '../ErrorMessage'

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
  handleResetNumber: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  handleResetNumber: () => {},
  size: 'md',
}

function SelectField(props) {
  const { name, size, options, onChange: onChangeProps, isDisabled, handleResetNumber, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()

  const value = isEmpty(options) ? '' : options.find(option => option.value === field.value)
  const hasValue = Boolean(value)

  const onChange = newValue => {
    setFieldValue(field.name, newValue.value)
    onChangeProps(newValue, options)
    handleResetNumber()
  }

  return (
    <>
      <Select
        value={value ?? ''}
        onChange={onChange}
        options={options}
        controlShouldRenderValue={hasValue}
        placeholder='請選擇'
        isDisabled={isDisabled}
        {...restProps}
      />
      <ErrorMessage name={name} size={size} />
    </>
  )
}

SelectField.propTypes = propTypes
SelectField.defaultProps = defaultProps

export default SelectField
