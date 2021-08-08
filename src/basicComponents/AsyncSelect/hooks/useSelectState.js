import { useState } from 'react'
import { isEmpty } from 'lodash'

function useSelectState({ shouldClearOptions, onChangeProps, onInputChangeProps, onBlurProps }) {
  const [inputValue, setInputValue] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  return {
    inputValue,

    onInputChange(value, { action }) {
      if (action === 'input-blur' || action === 'menu-close') return

      setInputValue(value)
      onInputChangeProps(value)
    },

    onChange(option) {
      onChangeProps(option)
      setInputValue(option.label)
      setCurrentValue(option.label)
    },

    onBlur(event) {
      const hasValue = Boolean(currentValue)

      if (hasValue && !isEmpty(inputValue)) {
        setInputValue(currentValue)
        onBlurProps(currentValue)
      } else {
        setInputValue('')
        onBlurProps('')
      }
    },
  }
}

export default useSelectState
