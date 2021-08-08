// Libs
import React from 'react'
import ReactAsyncSelect from 'react-select/async'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

// Components

// Lib MISC
import useSelectState from './hooks/useSelectState'

// Style

// PropTypes
export const propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.object,
  isDisabled: PropTypes.bool,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
  onBlur: () => {},
  onInputChange: () => {},
}

const getStyles = inputValue => ({
  control: (styles, { isDisabled, selectProps }) => {
    const input = '& > div:first-of-type input'
    const valueViewer = 'div[class$="singleValue"]'
    const placeholder = '& > div:first-of-type > div'

    return {
      ...styles,
      boxShadow: 'none',
      height: selectProps?.height || '34px',

      [input]: {
        opacity: '1 !important',
      },

      [placeholder]: {
        fontSize: '14px',
        opacity: isDisabled ? '0.4' : '1',
      },

      [valueViewer]: {
        color: isEmpty(inputValue) ? 'transparent' : '#000',
      },

      '&:hover': {
        borderColor: '#2a69c7',
      },
    }
  },

  singleValue: styles => ({
    ...styles,
    color: '#000',
  }),

  indicatorSeparator: styles => ({ ...styles, display: 'none' }),

  menu: (styles, { selectProps }) => {
    const { value, inputValue } = selectProps
    const isMenuHidden = value === inputValue || inputValue.trim() === ''

    return {
      ...styles,
      display: isMenuHidden ? 'none' : 'block',
    }
  },

  menuList: style => ({
    ...style,
    maxHeight: 200,
  }),
})

function AsyncSelect({
  placeholder,
  isDisabled,
  loadOptions,
  onChange: onChangeProps,
  onInputChange: onInputChangeProps,
  onBlur: onBlurProps,
  value,
  ...restProps
}) {
  const { inputValue, onInputChange, onChange, onBlur } = useSelectState({
    onChangeProps,
    onInputChangeProps,
    onBlurProps,
  })

  return (
    <ReactAsyncSelect
      inputValue={inputValue}
      onInputChange={onInputChange}
      onChange={onChange}
      onBlur={onBlur}
      components={{ DropdownIndicator: () => null }}
      styles={getStyles(inputValue)}
      placeholder={placeholder}
      isDisabled={isDisabled}
      loadOptions={loadOptions}
      {...restProps}
    />
  )
}

AsyncSelect.propTypes = propTypes
AsyncSelect.defaultProps = defaultProps

export default AsyncSelect
