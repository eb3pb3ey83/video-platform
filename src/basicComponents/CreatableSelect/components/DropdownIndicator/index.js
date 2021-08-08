// Libs
import React from 'react'
import { components } from 'react-select'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'

// Style

// PropTypes
export const propTypes = {
  selectProps: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function DropdownIndicator(props) {
  const { selectProps } = props
  const { menuIsOpen } = selectProps

  return <components.DropdownIndicator {...props}>{menuIsOpen ? <Icon.ChevronUp /> : <Icon.ChevronDown />}</components.DropdownIndicator>
}

DropdownIndicator.propTypes = propTypes
DropdownIndicator.defaultProps = defaultProps

export default DropdownIndicator
