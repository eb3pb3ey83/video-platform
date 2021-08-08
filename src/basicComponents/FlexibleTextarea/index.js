// Libs
import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './style.module.scss'

// Components

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  resize: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  onChange: () => {},
  resize: true,
}

function FlexibleTextarea(props) {
  const { className, onChange: propOnChange, resize, ...restProps } = props

  const textareaRef = useRef(null)
  const textArea = textareaRef?.current
  const textAreaHeight = useRef(0)

  const calcTextareaHeight = useCallback(() => {
    if (!textArea || !resize) return

    textArea.style.height = `${textAreaHeight.current}px`
    textArea.style.height = `${textArea.scrollHeight}px`
  }, [resize, textArea])

  const onChange = event => {
    calcTextareaHeight()

    if (typeof propOnChange === 'function') {
      propOnChange(event)
    }
  }

  useEffect(() => {
    textAreaHeight.current = textArea?.clientHeight
  }, [textArea])

  useEffect(() => {
    const isContentOverflow = textAreaHeight.current < textArea?.scrollHeight

    if (isContentOverflow) {
      calcTextareaHeight()
    }
  }, [textArea, calcTextareaHeight])

  return <textarea className={cx('textarea', className)} onChange={onChange} ref={textareaRef} {...restProps} />
}

FlexibleTextarea.propTypes = propTypes
FlexibleTextarea.defaultProps = defaultProps

export default FlexibleTextarea
