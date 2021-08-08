import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'formik'
import classnames from 'classnames/bind'

// Components
import DateInputField from './DateInputField'
import RangePickerField from './RangePickerField'
import MultiSelectField from './MultiSelectField'
import AsyncSelectField from './AsyncSelectField'
import CreatableSelectField from './CreatableSelectField'
import SelectField from './SelectField'
import InputField from './InputField'
import FlexibleTextareaField from './FlexibleTextareaField'
import RadioField from './RadioField'
import RadioGroupField from './RadioGroupField'
import MultiCreateInputField from './MultiCreateInputField'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  forwardRef: PropTypes.any,
  shouldPreventEnterSubmit: PropTypes.bool,
  formik: PropTypes.object,
}

const Form = React.memo(props => {
  const { className, forwardRef, formik, shouldPreventEnterSubmit, ...restProps } = props

  const onKeyDown = useCallback(
    event => {
      if (!shouldPreventEnterSubmit) return

      const isPressEnter = event.keyCode === 13

      if (isPressEnter) event.preventDefault()
    },
    [shouldPreventEnterSubmit],
  )

  return (
    <form
      onKeyDown={onKeyDown}
      className={cx('home-form', className)}
      ref={forwardRef}
      onReset={formik.handleReset}
      onSubmit={formik.handleSubmit}
      {...restProps}
    />
  )
})

Form.propTypes = propTypes

const ConnectedForm = connect(Form)
const ConnectedFormWithRef = React.forwardRef((props, ref) => <ConnectedForm {...props} forwardRef={ref} />)

ConnectedFormWithRef.RangePickerField = RangePickerField
ConnectedFormWithRef.MultiSelectField = MultiSelectField
ConnectedFormWithRef.AsyncSelectField = AsyncSelectField
ConnectedFormWithRef.CreatableSelectField = CreatableSelectField
ConnectedFormWithRef.SelectField = SelectField
ConnectedFormWithRef.InputField = InputField
ConnectedFormWithRef.FlexibleTextareaField = FlexibleTextareaField
ConnectedFormWithRef.RadioField = RadioField
ConnectedFormWithRef.RadioGroupField = RadioGroupField
ConnectedFormWithRef.MultiCreateInputField = MultiCreateInputField
ConnectedFormWithRef.DateInputField = DateInputField

export default ConnectedFormWithRef
