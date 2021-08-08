import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { useRouteMatch, useHistory } from 'react-router-dom'

// Components
import MediaItem from '@/views/Home/sharedComponents/MediaItem'

import Icon from '@/basicComponents/Icon'

// Lib MISC
import { onMediaIndexChange } from './eventHandler/methods/onMediaIndexChange'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  mediaInfo: PropTypes.object,
  isMediaInfoFetched: PropTypes.bool,
  isEditMode: PropTypes.bool,
  currentTime: PropTypes.string,
}

function MediaDisplay(props) {
  const { isEditMode, mediaInfo, isMediaInfoFetched, currentTime } = props
  const formikContext = useFormikContext()
  const { setFieldValue, values } = formikContext
  const { viewUrl, hlsUrl, isVideo, format, accessAuthority } = mediaInfo
  const history = useHistory()
  const { params } = useRouteMatch('/home/media/:mediaId/info')
  const currentMediaId = Number(params.mediaId)
  const { preiousMediaId, nextMediaId, handleChangeMedia, hasPreviousMedia, hasNextMedia } = onMediaIndexChange(history, currentMediaId)

  return (
    <div className={cx('media-display')}>
      <Icon.Previous
        className={cx('media-display__icon')}
        data-id={preiousMediaId}
        data-is-disabled={!hasPreviousMedia}
        onClick={event => handleChangeMedia(event, hasPreviousMedia)}
      />
      <MediaItem.Display
        className={cx('media-display__item')}
        mediaViewUrl={viewUrl}
        mediaHlsUrl={hlsUrl}
        isVideo={isVideo}
        type={format}
        isEditMode={isEditMode}
        setFieldValue={setFieldValue}
        currentImageAngle={values.fileRotation}
        accessAuthority={accessAuthority}
        isMediaInfoFetched={isMediaInfoFetched}
        currentMediaId={currentMediaId}
        currentTime={currentTime}
      />
      <Icon.Next
        className={cx('media-display__icon')}
        data-id={nextMediaId}
        data-is-disabled={!hasNextMedia}
        onClick={event => handleChangeMedia(event, hasNextMedia)}
      />
    </div>
  )
}

MediaDisplay.propTypes = propTypes

export default MediaDisplay
