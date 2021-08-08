import React from 'react'
import { useHistory } from 'react-router-dom'

// Components
import ActivityCreatorFormik from './components/ActivityCreatorFormik'
import ActivityCreatorForm from './components/ActivityCreatorForm'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function ActivityCreator(props) {
  const history = useHistory()

  const goActivity = () => history.push('/home/activity')

  return (
    <ActivityCreatorFormik goActivity={goActivity} {...props}>
      <ActivityCreatorForm isOpened modalTitle='新增單筆活動' width='412px' onClose={goActivity} />
    </ActivityCreatorFormik>
  )
}

ActivityCreator.propTypes = propTypes

export default ActivityCreator
