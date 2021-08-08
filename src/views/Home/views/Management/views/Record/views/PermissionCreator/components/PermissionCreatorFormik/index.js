// Libs
import React from 'react'
import PropTypes from 'prop-types'
import { Formik } from 'formik'

// Components

// Lib MISC
import { useGlobalState } from '@/globalState'
import getformikConfig from './formikConfig'

// PropTypes
export const propTypes = {
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function PermissionCreatorFormik(props) {
  const { children } = props
  const [, dispatch] = useGlobalState()
  const formikConfig = getformikConfig(props, dispatch)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => children}</Formik>
}

PermissionCreatorFormik.propTypes = propTypes
PermissionCreatorFormik.defaultProps = defaultProps

export default PermissionCreatorFormik
