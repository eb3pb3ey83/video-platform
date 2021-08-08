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

function MediaInfoFormik(props) {
  const { children } = props
  const formikConfig = getformikConfig(props)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => <Form shouldPreventEnterSubmit>{children}</Form>}</Formik>
}

MediaInfoFormik.propTypes = propTypes
MediaInfoFormik.defaultProps = defaultProps

export default MediaInfoFormik
