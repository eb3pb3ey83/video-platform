// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components
import Radio from '@/basicComponents/Radio'

// Lib MISC

// Style

// PropTypes
export const propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  group: PropTypes.string,
  groupLength: PropTypes.number,
  onChangeProps: PropTypes.func,
}

export const defaultProps = {
  onChangeProps: () => {},
}

function RadioField(props) {
  const { group, value, onChangeProps, ...restProps } = props

  const { values, setFieldValue } = useFormikContext()

  const onRadioChange = event => {
    setFieldValue(group, value)
    onChangeProps()
  }

  return (
    <>
      <Radio checked={values[group] === value} onChange={onRadioChange} {...restProps} />
    </>
  )
}

RadioField.propTypes = propTypes
RadioField.defaultProps = defaultProps

export default RadioField
