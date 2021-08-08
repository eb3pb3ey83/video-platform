import React from 'react'
// import styles from './style.module.scss'
// import classnames from 'classnames/bind'
import { useHistory, useRouteMatch, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import FullModal from '@/basicComponents/FullModal'
import UploadFormik from './components/UploadFormik'
import UploadForm from './components/UploadForm'
import ConfirmationAlert from '@/views/Home/sharedComponents/ConfirmationAlert'

// Lib MISC
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'
import { useVideoLanguageOptions } from '@/views/Home/eventHandler/shareComputedValues/useVideoLanguageOptions'
import { useKeyWordOptions } from '@/views/Home/eventHandler/shareComputedValues/useKeyWordOptions'
import { useRoleUserOptions } from '@/views/Home/eventHandler/shareComputedValues/useRoleUserOptions'
// Variables / Functions
// const cx = classnames.bind(styles)

export const propTypes = {
  eventName: PropTypes.string,
}

function Upload(props) {
  const history = useHistory()
  const { params } = useRouteMatch('/home/activity/:eventId/info/upload')
  const { eventId } = params
  const { eventName } = props
  const { placeOptions } = usePlaceOptions({ hasAll: false, isQuery: true })
  const { videoLanguageOptions } = useVideoLanguageOptions({ hasAll: false, isQuery: true })
  const { keyWordOptions } = useKeyWordOptions()
  const { roleUserOptions } = useRoleUserOptions({ hasAll: false, isQuery: true })
  const goInfo = () => history.push(`/home/activity/${eventId}/info`)

  return (
    <>
      <FullModal
        headerTitle={eventName}
        isOpened
        onClose={goInfo}
        ConfirmationAlert={ConfirmationAlert}
        confirmTitle='即將結束媒體上傳'
        confirmText='一但離開後，將不會保留剛所上傳的檔案及編輯的圖說項目。'
        shouldConfirmBeforeClose
      >
        {openConfirmation => (
          <UploadFormik goInfo={goInfo}>
            <UploadForm
              eventName={eventName}
              eventId={eventId}
              placeOptions={placeOptions}
              videoLanguageOptions={videoLanguageOptions}
              keyWordOptions={keyWordOptions}
              roleUserOptions={roleUserOptions}
            />
          </UploadFormik>
        )}
      </FullModal>
    </>
  )
}

Upload.propTypes = propTypes

export default withRouter(Upload)
