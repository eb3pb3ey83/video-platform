import React from 'react'
import { useHistory } from 'react-router-dom'

// Components
import ImportFormik from './components/ImportFormik'
import ImportForm from './components/ImportForm'

// Lib MISC

// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {}

function Import(props) {
  const history = useHistory()

  const goActivity = () => {
    history.push('/home/activity')
  }

  return (
    <ImportFormik goActivity={goActivity} {...props}>
      <ImportForm isOpened modalTitle='請選擇檔案' onClose={goActivity} />
    </ImportFormik>
  )
}
// Import.propTypes = propTypes

export default Import
