import React from 'react'
import { hot } from 'react-hot-loader/root'

// Components
import ViewFormik from './components/ViewFormik'
import ViewForm from './components/ViewForm'

// Lib MISC

// Variables / Functions

export const propTypes = {}

function View(props) {
  return (
    <>
      <ViewFormik {...props}>
        <ViewForm />
      </ViewFormik>
    </>
  )
}

View.propTypes = propTypes

export default hot(View)
