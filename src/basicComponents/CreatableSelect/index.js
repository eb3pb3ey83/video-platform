// Libs
import React from 'react'
import CreatableSelect from 'react-select/creatable'
import PropTypes from 'prop-types'
// import { isEmpty } from 'lodash'

// Components
import DropdownIndicator from '../CreatableSelect/components/DropdownIndicator'

// Lib MISC
import useSelectState from './hooks/useSelectState'

// Style

// PropTypes
export const propTypes = {
  placeholder: PropTypes.string,
  currentOption: PropTypes.object,
  isDisabled: PropTypes.bool,
  options: PropTypes.array,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
}

const getStyles = inputValue => ({
  control: (styles, { selectProps }) => {
    const wrapper = '& > div:first-of-type'
    const indicatorsContainer = '& > div:nth-of-type(2) >  div:first-of-type '
    const input = '& > div:first-of-type input'

    return {
      ...styles,
      background: '#ffffff',
      boxShadow: 'none',
      borderRadius: '3px',
      minHeight: '34px',
      height: selectProps?.height || '34px',
      [wrapper]: {
        paddingLeft: '10px',
      },
      [indicatorsContainer]: {
        paddingTop: '2px',
      },
      [input]: {
        opacity: '1 !important',
      },
      '&:hover': {
        borderColor: '#2a69c7',
      },
    }
  },
  menu: styles => {
    return {
      ...styles,
    }
  },
  indicatorSeparator: styles => {
    return {
      ...styles,
      display: 'none',
      padding: '8px',
    }
  },
  singleValue: styles => ({
    ...styles,
    color: '#000',
  }),
})

const formatCreateLabel = inputValue => {
  return (
    <>
      若無符合的選項，請點擊後新增欄位資訊:
      <strong> {inputValue}</strong>
    </>
  )
}

function CreatableSelectComponent({
  placeholder,
  isDisabled,
  options,
  onChange: onChangeProps,
  onInputChange: onInputChangeProps,
  onBlur: onBlurProps,
  currentOption,
  ...restProps
}) {
  const { inputValue, onChange, onInputChange, onBlur } = useSelectState(onChangeProps, onInputChangeProps, onBlurProps, currentOption.label)

  return (
    <CreatableSelect
      components={{ DropdownIndicator: isDisabled ? null : DropdownIndicator }}
      styles={getStyles()}
      inputValue={inputValue}
      value={inputValue}
      onChange={onChange}
      placeholder={placeholder}
      isDisabled={isDisabled}
      options={options}
      formatCreateLabel={formatCreateLabel}
      onInputChange={onInputChange}
      onBlur={onBlur}
      {...restProps}
    />
  )
}

CreatableSelectComponent.propTypes = propTypes
CreatableSelectComponent.defaultProps = defaultProps

export default CreatableSelectComponent
