import { useState, useEffect } from 'react'

function useSelectState(onChangeProps, onInputChangeProps, onBlurProps, value) {
  const [inputValue, setInputValue] = useState('')
  const [currentValue, setCurrentValue] = useState('')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return {
    inputValue,

    onInputChange(value, { action }) {
      if (action === 'input-change') {
        setInputValue(value)
        onInputChangeProps(value)
      } else if (action === 'set-value') {
        setCurrentValue(inputValue)
        onInputChangeProps(inputValue)
      }
    },

    onChange(option) {
      onChangeProps(option)
      setInputValue(option.label)
      setCurrentValue(option.label)
    },

    onBlur(event) {
      const hasValue = Boolean(currentValue)

      if (hasValue) {
        setInputValue(currentValue)
      } else {
        setInputValue('')
      }
      onBlurProps(currentValue)
    },
  }
}

export default useSelectState
