// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext, useField } from 'formik'
import { isEmpty } from 'lodash'

// Components
import Select from '@/basicComponents/Select'
import ErrorMessage from '../ErrorMessage'

// Style

// PropTypes
export const propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  selectProps: PropTypes.object,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  options: [],
  onChange: () => {},
  size: 'md',
}

const styles = {
  control: (styles, { selectProps }) => {
    return {
      ...styles,
      minHeight: '40px',
      height: selectProps?.height || 'auto',
    }
  },

  indicatorSeparator: styles => {
    return {
      ...styles,
      display: 'none',
      padding: '8px',
    }
  },

  multiValue: (styles, { isDisabled }) => {
    const value = '& > div: first-child'
    return {
      ...styles,
      alignItems: 'center',
      marginRight: '7px',
      fontSize: '12px',
      [value]: {
        borderRadius: '2px',
        padding: '3px',
        paddingLeft: '6px',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
      },
    }
  },

  multiValueRemove: (styles, { isDisabled }) => ({
    ...styles,
    width: '20px',
    height: '20px',
  }),
}

function MultiSelectField(props) {
  const { name, size, options, onChange: onChangeProps, isDisabled, ...restProps } = props
  const [field] = useField(props)
  const { setFieldValue } = useFormikContext()
  const isValueEmpty = isEmpty(options) || !field.value

  const value = isValueEmpty ? '' : options.filter(option => field.value.includes(option.value))
  const hasValue = Boolean(value)

  const onChange = option => {
    // isMulti 模式時，點擊 multi value 上的刪除按鈕到沒有值時，onChange 事件的 option 會回傳 null
    const newOption = option === null ? [] : option

    setFieldValue(
      field.name,
      newOption.map(o => o.value),
    )

    if (typeof onChange === 'function') {
      onChangeProps(null, options)
    }
  }

  return (
    <>
      <Select
        isMulti
        styles={styles}
        value={value ?? []}
        onChange={onChange}
        options={options}
        controlShouldRenderValue={hasValue}
        closeMenuOnSelect={false}
        placeholder='請選擇'
        isDisabled={isDisabled}
        {...restProps}
      />
      <ErrorMessage name={name} size={size} />
    </>
  )
}

MultiSelectField.propTypes = propTypes
MultiSelectField.defaultProps = defaultProps

export default MultiSelectField
