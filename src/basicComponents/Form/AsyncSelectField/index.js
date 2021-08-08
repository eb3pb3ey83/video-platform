// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import AsyncSelect from '@/basicComponents/AsyncSelect'
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onCreateOption: PropTypes.func,
  selectCss: PropTypes.object,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  onCreateOption: () => {},
}

function AsyncSelectField(props) {
  const { name, selectCss, options, onChange, onCreateOption, isDisabled, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const { value: fieldValue } = field
  const hasValue = Boolean(fieldValue)

  const onChangeAction = option => {
    setFieldValue(field.name, option.value)
    onChange(option, options)
  }

  return (
    <div className={cx('wrapper')}>
      <AsyncSelect css={selectCss} onChange={onChangeAction} controlShouldRenderValue={hasValue} isDisabled={isDisabled} {...restProps} />
      <ErrorMessage name={name} />
    </div>
  )
}

AsyncSelectField.propTypes = propTypes
AsyncSelectField.defaultProps = defaultProps

export default AsyncSelectField
