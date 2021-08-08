import React from 'react'
import { hot } from 'react-hot-loader/root'
// import PropTypes from 'prop-types'

// Components
import UploadFormik from './components/UploadFormik'
import UploadForm from './components/UploadForm'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function Upload(props) {
  return (
    <>
      <UploadFormik {...props}>
        <UploadForm />
      </UploadFormik>
    </>
  )
}

Upload.propTypes = propTypes

export default hot(Upload)
