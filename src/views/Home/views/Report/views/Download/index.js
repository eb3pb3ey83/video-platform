import React from 'react'
import { hot } from 'react-hot-loader/root'

// Components
import DownloadFormik from './components/DownloadFormik'
import DownloadForm from './components/DownloadForm'

// Lib MISC

// Variables / Functions

export const propTypes = {}

function View(props) {
  return (
    <>
      <DownloadFormik {...props}>
        <DownloadForm />
      </DownloadFormik>
    </>
  )
}

View.propTypes = propTypes

export default hot(View)
