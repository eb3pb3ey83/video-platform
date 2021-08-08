import React, { useState, useEffect } from 'react'
import { find } from 'lodash'
import PropTypes from 'prop-types'

import CreatableSelect from 'react-select/creatable'

const components = {
  DropdownIndicator: null,
}

const createOption = label => ({
  label,
  value: label,
})

export const defaultProps = {
  height: 40,
  value: [],
}

export const propTypes = {
  maxLength: PropTypes.number,
  height: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  handleKeyDownProps: PropTypes.func,
  handleChangeProps: PropTypes.func,
  textMaxLength: PropTypes.number,
  fileNo: PropTypes.string,
}

function MultiCreateInput(props) {
  const { value: propsValue, textMaxLength, height, maxLength, placeholder, handleKeyDownProps, handleChangeProps, fileNo } = props
  const [inputValue, setInputValue] = useState()
  const [value, setValue] = useState(() => propsValue.map(value => createOption(value)))

  // 如果 fileNo 有變動，就把 MultiCreateInput 的 value 清空
  useEffect(() => {
    if (fileNo) setValue([])
  }, [fileNo])

  const styles = {
    control: (styles, { selectProps }) => {
      return {
        ...styles,
        minHeight: height,
        height: 'auto',
      }
    },

    multiValue: styles => {
      return {
        ...styles,
      }
    },

    multiValueRemove: styles => {
      return {
        ...styles,

        '&:hover': {},
      }
    },
  }

  const handleChange = (value, actionMeta) => {
    setValue(value || [])
    handleChangeProps(value || [])
  }

  const handleInputChange = inputValue => {
    if (textMaxLength && inputValue.length > textMaxLength) return

    setInputValue(inputValue)
  }

  const handleKeyDown = event => {
    if (!inputValue) return

    const hasInputValue = find(value, { label: inputValue, value: inputValue })
    const currentValueLength = value.length

    if (hasInputValue || currentValueLength === maxLength) return

    switch (event.which) {
      case 13:
        setValue([...value, createOption(inputValue)])
        setInputValue('')
        handleKeyDownProps([...value, createOption(inputValue)])
        event.preventDefault()
    }
  }

  return (
    <CreatableSelect
      components={components}
      styles={styles}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={handleChange}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      value={value}
    />
  )
}

MultiCreateInput.propTypes = propTypes
MultiCreateInput.defaultProps = defaultProps
export default MultiCreateInput
