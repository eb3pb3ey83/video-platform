import React from 'react'
import { hot } from 'react-hot-loader/root'
// import PropTypes from 'prop-types'

// Components
import navigations from './eventHandler/navigations'
import RecordFormik from './components/RecordFormik'
import RecordForm from './components/RecordForm'
import View from '@/basicComponents/View'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function Record(props) {
  return (
    <>
      <View to='/home/management/record' navigations={navigations} {...props} />
      <RecordFormik {...props}>
        <RecordForm />
      </RecordFormik>
    </>
  )
}

Record.propTypes = propTypes

export default hot(Record)
