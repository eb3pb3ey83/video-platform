import React from 'react'
import { hot } from 'react-hot-loader/root'
// import PropTypes from 'prop-types'

// Components
import ApplicationRecordFormik from './components/ApplicationRecordFormik'
import ApplicationRecordForm from './components/ApplicationRecordForm'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function ApplicationRecord(props) {
  return (
    <>
      <ApplicationRecordFormik {...props}>
        <ApplicationRecordForm />
      </ApplicationRecordFormik>
    </>
  )
}

ApplicationRecord.propTypes = propTypes

export default hot(ApplicationRecord)
