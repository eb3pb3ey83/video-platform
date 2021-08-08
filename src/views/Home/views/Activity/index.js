// Libs
import React from 'react'
import { hot } from 'react-hot-loader/root'

// Components
import navigations from './eventHandler/navigations'
import ActivityForm from './components/ActivityForm'
import ActivityFormik from './components/ActivityFormik'
import View from '@/basicComponents/View'

// Lib MISC

// Style
// import getStyle from './style'

// PropTypes
export const propTypes = {}

// DefaultProps
export const defaultProps = {}

function Activity(props) {
  return (
    <>
      <View to='/home/activity' navigations={navigations} {...props} />
      <ActivityFormik {...props}>
        <ActivityForm />
      </ActivityFormik>
    </>
  )
}

Activity.propTypes = propTypes
Activity.defaultProps = defaultProps

export default hot(Activity)
