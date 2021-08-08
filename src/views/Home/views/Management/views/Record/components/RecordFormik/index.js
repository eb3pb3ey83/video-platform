// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components
import Form from '@/basicComponents/Form'

// Lib MISC
import getFormikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function RecordFormik(props) {
  const { children } = props
  const formikConfig = getFormikConfig(props)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => <Form>{children}</Form>}</Formik>
}

RecordFormik.propTypes = propTypes
RecordFormik.defaultProps = defaultProps

export default RecordFormik
