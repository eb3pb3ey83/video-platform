// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { useGlobalState } from '@/globalState'

// Components
import Form from '@/basicComponents/Form'

// Lib MISC
import getformikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
  formRef: PropTypes.any,
  placeOptions: PropTypes.array,
}

// DefaultProps
export const defaultProps = {}

function UploadFormik(props) {
  const [, dispatch] = useGlobalState()
  const { children } = props
  const formikConfig = getformikConfig(props, dispatch)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => <Form>{children}</Form>}</Formik>
}

UploadFormik.propTypes = propTypes
UploadFormik.defaultProps = defaultProps

export default UploadFormik
