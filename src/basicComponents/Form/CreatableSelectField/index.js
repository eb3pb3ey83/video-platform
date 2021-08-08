// Libs
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components
import CreatableSelect from '@/basicComponents/CreatableSelect'
import ErrorMessage from '../ErrorMessage'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onCreateOption: PropTypes.func,
  selectClassName: PropTypes.string,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  size: 'md',
}

function CreatableSelectField(props) {
  const { name, size, selectClassName, options, isDisabled, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const [inputValue, setInputValue] = useState('')
  const [currentOption, setCurrentOption] = useState({})
  const { value: fieldValue } = field
  const value = isEmpty(options) ? '' : options.find(option => option.value === field.value)
  const hasValue = Boolean(fieldValue)

  const onChangeAction = option => {
    setCurrentOption(option)
    setFieldValue(field.name, option.value)
  }

  const onCreateOptionAction = newValue => {
    setFieldValue(field.name, newValue)
  }

  const onBlur = () => {
    if (isEmpty(inputValue) && !isEmpty(fieldValue)) {
      setFieldValue(field.name, fieldValue)
    }
  }

  useEffect(() => {
    setInputValue(fieldValue)
  }, [fieldValue])

  return (
    <div className={cx('creatable-select')}>
      <CreatableSelect
        value={value ?? ''}
        className={selectClassName}
        currentOption={currentOption}
        onCreateOption={onCreateOptionAction}
        onInputChange={value => setInputValue(value)}
        onBlur={onBlur}
        onChange={onChangeAction}
        controlShouldRenderValue={hasValue}
        placeholder='Please select'
        isDisabled={isDisabled}
        options={options}
        {...restProps}
      />
      <ErrorMessage name={name} size={size} />
    </div>
  )
}

CreatableSelectField.propTypes = propTypes
CreatableSelectField.defaultProps = defaultProps

export default CreatableSelectField
