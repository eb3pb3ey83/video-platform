// Libs
import React from 'react'
import ReactSelect from 'react-select'
import PropTypes from 'prop-types'
// import classnames from 'classnames/bind'

// Components
import DropdownIndicator from '../Select/components/DropdownIndicator'
import MultiValueRemove from './components/MultiValueRemove'

// Style
// import sassStyles from './style.module.scss'

// Variables / Functions
// const cx = classnames.bind(sassStyles)

// Variables / Functions

// PropTypes
export const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  placeholder: '',
}

const styles = {
  control: (styles, { selectProps }) => {
    const wrapper = '& > div:first-of-type'
    const indicatorsContainer = '& > div:nth-of-type(2) >  div:first-of-type '
    const input = '& > div:first-of-type > div'
    // const placeholder = '& > div > div:first-of-type > div'
    return {
      ...styles,
      backgroundColor: '#ffffff',
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
        padding: 0,
      },

      '&:hover': {
        borderColor: '#2a69c7',
      },
    }
  },

  menu: styles => {
    return {
      ...styles,
      zIndex: 10,
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

  multiValue: (styles, { isDisabled }) => {
    const value = '& > div: first-child'
    return {
      ...styles,
      background: 'none',
      color: '#000',
      alignItems: 'center',
      marginRight: '7px',
      fontSize: '12px',
      [value]: {
        padding: isDisabled ? 0 : '0 5px 0 0',
      },
    }
  },

  multiValueRemove: (styles, { isDisabled }) => ({
    ...styles,
    background: '#000',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    padding: '2px',
    cursor: 'pointer',
    display: isDisabled ? 'none' : 'flex',
    '&:hover': {
      background: '#000',
    },
  }),
}

function Select({ placeholder, isDisabled, ...restProps }) {
  return (
    <ReactSelect
      components={{
        DropdownIndicator: isDisabled ? null : DropdownIndicator,
        MultiValueRemove,
      }}
      styles={styles}
      placeholder={placeholder}
      isDisabled={isDisabled}
      {...restProps}
    />
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
