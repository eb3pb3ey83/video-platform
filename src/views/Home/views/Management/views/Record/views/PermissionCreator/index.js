import React from 'react'
import { useHistory } from 'react-router-dom'

// Components
import PermissionCreatorFormik from './components/PermissionCreatorFormik'
import PermissionCreatorForm from './components/PermissionCreatorForm'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function PermissionCreator(props) {
  const history = useHistory()

  const goRecord = () => history.push('/home/management/record')

  return (
    <PermissionCreatorFormik goRecord={goRecord} {...props}>
      <PermissionCreatorForm isOpened modalTitle='開放權限' width='587px' onClose={goRecord} />
    </PermissionCreatorFormik>
  )
}

PermissionCreator.propTypes = propTypes

export default PermissionCreator
