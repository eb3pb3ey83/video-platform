// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components
import Form from '@/basicComponents/Form'

// Lib MISC
import getformikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function ActivityFormik(props) {
  const { children } = props
  const formikConfig = getformikConfig(props)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => <Form>{children}</Form>}</Formik>
}

ActivityFormik.propTypes = propTypes
ActivityFormik.defaultProps = defaultProps

export default ActivityFormik
