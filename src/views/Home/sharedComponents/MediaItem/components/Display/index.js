import React from 'react'
import ReactDOM from 'react-dom'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Video from '@/basicComponents/Video'
import Icon from '@/basicComponents/Icon'
import Watermark from '../Watermark'
import MediaController from '@/views/Home/sharedComponents/MediaController'

// Lib MISC
import { useCurrentDisplay } from './eventHandler/methods/useCurrentDisplay'
import { canDisplayFileType } from '@/utils/can-display-file-type'

// Variables / Functions
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

const cx = classnames.bind(styles)

export const defaultProps = {
  hasWaterMark: true,
  type: '',
}

export const propTypes = {
  className: PropTypes.string,
  mediaViewUrl: PropTypes.string,
  mediaHlsUrl: PropTypes.string,
  type: PropTypes.string,
  currentTime: PropTypes.string,
  isVideo: PropTypes.bool,
  isEditMode: PropTypes.bool,
  isMediaInfoFetched: PropTypes.bool,
  accessAuthority: PropTypes.number,
  currentMediaId: PropTypes.number,
  currentImageAngle: PropTypes.number,
  setFieldValue: PropTypes.func,
}

function Display(props) {
  const {
    isEditMode,
    setFieldValue,
    currentImageAngle,
    className,
    mediaViewUrl,
    mediaHlsUrl,
    isVideo,
    accessAuthority,
    type,
    isMediaInfoFetched,
    currentMediaId,
    currentTime,
  } = props
  const { currentDisplay } = useCurrentDisplay(isMediaInfoFetched)
  const { isValidVideo, isValidImage } = canDisplayFileType(type)
  const showVideoDisplay = isValidVideo
  const showImageDisplay = !isValidVideo && isValidImage
  const showDefaultDisplay = !isValidVideo && !isValidImage
  const showWatermark = (isVideo && showDefaultDisplay) || !isVideo
  const isImageVertical = currentImageAngle % 180 !== 0

  return (
    <div className={cx('media-display-wrapper', className)}>
      {isEditMode && (
        <MediaController
          currentImageAngle={currentImageAngle}
          fieldName='fileRotation'
          setFieldValue={setFieldValue}
          isShowImageDisplay={showImageDisplay}
        />
      )}
      {showDefaultDisplay && <Icon.DefaultDisplay className={cx('media-default')} />}
      {showImageDisplay && (
        <img
          style={{ transform: `rotate(${currentImageAngle}deg)` }}
          data-is-vertical={isImageVertical}
          className={cx('media-image')}
          src={mediaViewUrl}
        />
      )}
      {showVideoDisplay && (
        <div className={cx('media-video-wrapper')}>
          <Video
            id='media-display'
            className={cx('media-video')}
            sources={[{ src: mediaHlsUrl }]}
            customSetting={{
              controls: accessAuthority === ACCESS_AUTHORITY.PUBLIC && true,
              controlBar: {
                pictureInPictureToggle: false,
              },
            }}
            type={type}
            currentMediaId={currentMediaId}
          />
          {currentDisplay &&
            ReactDOM.createPortal(<Watermark isDisplay size={30} currentMediaId={currentMediaId} currentTime={currentTime} />, currentDisplay)}
        </div>
      )}
      {accessAuthority === ACCESS_AUTHORITY.ALL && (
        <div className={cx('media-display-private')}>
          <div className={cx('media-display-private__cover')} />
          <Icon.Private className={cx('media-display-private__icon')} />
          <p className={cx('media-display-private__text')}>非公開媒體</p>
        </div>
      )}
      {showWatermark && <Watermark size={7} currentTime={currentTime} />}
    </div>
  )
}

Display.propTypes = propTypes
Display.defaultProps = defaultProps

export default Display
