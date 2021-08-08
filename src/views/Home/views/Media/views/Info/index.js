import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import { useHistory, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import FullModal from '@/basicComponents/FullModal'
import MediaInfoFormik from './components/MediaInfoFormik'
import MediaInfo from './components/MediaInfo'
import Description from './components/Description'
import MediaInfoButtonList from './components/MediaInfoButtonList'
import DeleteInfoModal from './components/DeleteInfoModal'
import MediaDisplay from './components/MediaDisplay'
import Spinner from '@/basicComponents/Spinner'
import Overlay from '@/basicComponents/Overlay'
import ConfirmationAlert from '@/views/Home/sharedComponents/ConfirmationAlert'

// Lib MISC
import { useHandleDeleteModal } from '@/views/Home/eventHandler/shareMethods/useHandleDeleteModal'
import { usePermission } from './eventHandler/computedValues/usePermission'
import { useMediaInfo } from './eventHandler/computedValues/useMediaInfo'
import { useHandleEditMode } from './eventHandler/methods/useHandleEditMode'
import { onDeleteModalConfirm } from './eventHandler/methods/onDeleteModalConfirm'
import { onMediaModalClose } from './eventHandler/methods/onMediaModalClose'
import { useRemoveMediaInfo } from './eventHandler/methods/useRemoveMediaInfo'
import { start } from '@/utils/start-flow'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  match: PropTypes.object,
}

function Info(props) {
  const { match } = props
  const history = useHistory()
  const { isEditMode, toggleEditMode } = useHandleEditMode()
  const { isShowDeleteAlert, toggleAlert } = useHandleDeleteModal()
  const attachmentId = match.params.mediaId
  const { mediaInfo, isMediaInfoFetched } = useMediaInfo(attachmentId)
  const { currentTime } = mediaInfo
  const viewData = mediaInfo?.viewData ?? {}
  const permissions = usePermission(viewData)
  const { eventName, eventId } = viewData

  useRemoveMediaInfo()

  return (
    <FullModal
      isShowBackButton
      headerTitle={eventName}
      isOpened
      onClose={event => onMediaModalClose(history)}
      ConfirmationAlert={ConfirmationAlert}
      shouldConfirmBeforeClose={isEditMode}
      confirmTitle='捨棄變更資料？'
      confirmText='一但離開編輯模式，系統不會保存剛所變更資料。 是否捨棄剛所變更資料並返回上頁?'
    >
      {openConfirmation => (
        <>
          <MediaInfoFormik toggleEditMode={toggleEditMode} initialValues={mediaInfo?.editData}>
            <MediaDisplay isEditMode={isEditMode} mediaInfo={viewData} isMediaInfoFetched={isMediaInfoFetched} currentTime={currentTime} />
            <div className={cx('media-info')}>
              <DeleteInfoModal
                onConfirm={() => onDeleteModalConfirm(history, attachmentId)}
                eventName={eventName}
                isOpened={isShowDeleteAlert}
                onClose={toggleAlert}
              />

              <MediaInfo attachmentId={attachmentId} data={viewData} />

              {!isEditMode && (
                <>
                  <Description.View data={viewData} eventId={eventId} />
                  <MediaInfoButtonList.View
                    downloadUrl={viewData.viewUrl}
                    downloadData={mediaInfo?.downloadData}
                    toggleAlert={toggleAlert}
                    onModeChange={toggleEditMode}
                    permissions={permissions}
                  />
                </>
              )}

              {isEditMode && (
                <>
                  <Description.Edit data={viewData} permissions={permissions} eventId={eventId} />
                  <MediaInfoButtonList.Edit
                    onModeChange={resetForm => openConfirmation(start(toggleEditMode).end(resetForm))}
                    permissions={permissions}
                  />
                </>
              )}
            </div>
          </MediaInfoFormik>

          <Overlay isShowed={!isMediaInfoFetched} shouldCreatePortal={false} style={{ zIndex: 10, height: '100%' }}>
            <Spinner />
          </Overlay>
        </>
      )}
    </FullModal>
  )
}

Info.propTypes = propTypes

export default withRouter(Info)
