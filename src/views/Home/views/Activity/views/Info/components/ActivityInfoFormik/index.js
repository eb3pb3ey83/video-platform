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
  initialValues: PropTypes.shape({
    deptId: PropTypes.string,
    eventName: PropTypes.shape({
      year: PropTypes.string,
      name: PropTypes.string,
    }),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    place: PropTypes.number,
    contact: PropTypes.string,
  }),
  children: PropTypes.node,
}

// DefaultProps
export const defaultProps = {}

function ActivityInfoFormik(props) {
  const { children } = props
  const formikConfig = getformikConfig(props)

  return <Formik {...formikConfig}>{({ submitForm, validateForm, handleReset }) => <Form>{children}</Form>}</Formik>
}

ActivityInfoFormik.propTypes = propTypes
ActivityInfoFormik.defaultProps = defaultProps

export default ActivityInfoFormik
