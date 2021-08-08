import React from 'react'
import { components as Components } from 'react-select'

// Components
import Icon from '@/basicComponents/Icon'

function MultiValueRemove(props) {
  return (
    <Components.MultiValueRemove {...props}>
      <Icon.Cross />
    </Components.MultiValueRemove>
  )
}

export default MultiValueRemove
