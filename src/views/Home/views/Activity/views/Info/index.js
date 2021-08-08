import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import { useHistory, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import navigations from './eventHandler/navigations'
import View from '@/basicComponents/View'
import FullModal from '@/basicComponents/FullModal'
import ActivityInfoFormik from './components/ActivityInfoFormik'
import ActivityInfoForm from './components/ActivityInfoForm'
import ActivityInfoButtonList from './components/ActivityInfoButtonList'
import DeleteInfoModal from './components/DeleteInfoModal'
import ConfirmationAlert from '@/views/Home/sharedComponents/ConfirmationAlert'
import MediaList from '@/views/Home/sharedComponents/MediaList'

// Lib MISC
import { useHandleDeleteModal } from '@/views/Home/eventHandler/shareMethods/useHandleDeleteModal'
import { usePermission } from './eventHandler/computedValues/usePermission'
import { useActivityInfo } from './eventHandler/computedValues/useActivityInfo'
import { useActivityMedia } from './eventHandler/computedValues/useActivityMedia'
import { useHandleEditMode } from './eventHandler/methods/useHandleEditMode'
import { onDeleteModalConfirm } from './eventHandler/methods/onDeleteModalConfirm'

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
  const eventId = props.match.params.eventId
  const { activityInfo } = useActivityInfo(eventId)
  const { activityMedia, isActivityMediaFetched, onMediaTypeClick, onLoadMoreClick } = useActivityMedia(eventId)
  const { currentTime } = activityMedia
  const viewData = activityInfo?.viewData ?? {}
  const eventName = viewData.eventName ?? ''
  const permissions = usePermission(viewData)
  const { imageAmount, videoAmount, placeId } = viewData

  return (
    <>
      <View to={match.url} componentProps={{ eventName }} navigations={navigations} {...props} />
      <FullModal
        headerTitle={eventName}
        isOpened
        onClose={() => history.push('/home/activity')}
        ConfirmationAlert={ConfirmationAlert}
        shouldConfirmBeforeClose={isEditMode}
        confirmTitle='捨棄變更資料？'
        confirmText='一但離開編輯模式，系統不會保存剛所變更資料。 是否捨棄剛所變更資料並返回上頁?'
        isShowBackButton
        isScrollable={!isEditMode}
      >
        {openConfirmation => (
          <ActivityInfoFormik toggleEditMode={toggleEditMode} eventId={eventId} initialValues={activityInfo?.editData}>
            <div className={cx('activity-info')} data-is-edit-mode={isEditMode}>
              <DeleteInfoModal
                onConfirm={() => onDeleteModalConfirm(history, eventId)}
                eventName={eventName}
                isOpened={isShowDeleteAlert}
                onClose={toggleAlert}
              />

              {!isEditMode && (
                <>
                  <ActivityInfoForm.View eventId={eventId} permissions={permissions} data={viewData} />
                  <ActivityInfoButtonList.View
                    toggleAlert={toggleAlert}
                    permissions={permissions}
                    onModeChange={toggleEditMode}
                    onUploadClick={() => {
                      history.push(`/home/activity/${eventId}/info/upload`)

                      window.localStorage.setItem('mediaPlaceId', placeId)
                    }}
                  />
                </>
              )}

              {isEditMode && (
                <>
                  <ActivityInfoForm.Edit eventId={eventId} permissions={permissions} data={viewData} />
                  <ActivityInfoButtonList.Edit onModeChange={() => openConfirmation(toggleEditMode)} />
                </>
              )}
            </div>

            <MediaList
              isActivity
              isEditMode={isEditMode}
              isMediaListFetched={isActivityMediaFetched}
              mediaData={activityMedia}
              onMediaTypeClick={onMediaTypeClick}
              onLoadMoreClick={onLoadMoreClick}
              eventId={eventId}
              imageAmount={imageAmount}
              videoAmount={videoAmount}
              currentTime={currentTime}
            />
          </ActivityInfoFormik>
        )}
      </FullModal>
    </>
  )
}

Info.propTypes = propTypes

export default withRouter(Info)
