import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Video from '@/basicComponents/Video'
import Typography from '@/basicComponents/Typography'
import Icon from '@/basicComponents/Icon'
import Watermark from '../Watermark'
import MediaController from '../../../MediaController'

// Lib MISC
import { canDisplayFileType } from '@/utils/can-display-file-type'
import { canVideoPlay } from '@/utils/can-video-play'

// Variables / Functions
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

const cx = classnames.bind(styles)

export const defaultProps = {
  hasWaterMark: true,
  isUploading: false,
  isShowControlBar: false,
  type: '',
  imageAngleList: [],
}

export const propTypes = {
  className: PropTypes.string,
  mediaViewUrl: PropTypes.string,
  mediaHlsUrl: PropTypes.string,
  currentImageAngle: PropTypes.number,
  index: PropTypes.number,
  accessAuthority: PropTypes.number,
  hasWaterMark: PropTypes.bool,
  isUploading: PropTypes.bool,
  type: PropTypes.string,
  currentTime: PropTypes.string,
  setFieldValue: PropTypes.func,
  onFileDelete: PropTypes.func,
}

function Thumbnail(props) {
  const {
    setFieldValue,
    currentImageAngle,
    className,
    index,
    mediaViewUrl,
    mediaHlsUrl,
    accessAuthority,
    hasWaterMark,
    type,
    isUploading,
    currentTime,
    onFileDelete,
  } = props

  const { isValidVideo, isValidImage } = canDisplayFileType(type) // AWS 轉檔後可顯示格式
  const canVideoPlayType = canVideoPlay(type) // video.js 可接受格式
  const isImageVertical = currentImageAngle % 180 !== 0

  // 媒體縮圖顯示需考慮是否為上傳頁面
  // 若在上傳頁面影片需參考 canVideoPlayType
  // 若不在上傳頁面影片則參考 isValidVideo
  // 圖片皆參考 isValidImage
  // 若以上皆不符合則給預設圖
  const showVideoDisplay = (isUploading && canVideoPlayType) || (!isUploading && isValidVideo)
  const showImageDisplay = (isUploading && !canVideoPlayType && isValidImage) || (!isUploading && !isValidVideo && isValidImage)
  const showDefaultDisplay = (isUploading && !canVideoPlayType && !isValidImage) || (!isUploading && !isValidVideo && !isValidImage)

  return (
    <div className={cx('media-thumbnail-wrapper', className)} data-is-uploading={isUploading}>
      {isUploading && (
        <MediaController
          isHidden
          hasDeleteFeature
          onFileDelete={onFileDelete}
          currentImageAngle={currentImageAngle}
          fieldName={`imageAngleList.${index}`}
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
            id={`my-video-${index}`}
            className={cx('media-video')}
            sources={[{ src: mediaHlsUrl }]}
            customSetting={{ controls: false }}
            type={type}
            isUploading={isUploading}
          />
          <Typography.Text className={cx('media-video__tag')}>影片</Typography.Text>
        </div>
      )}
      {accessAuthority === ACCESS_AUTHORITY.ALL && <Icon.Private className={cx('media-thumbnail__status')} />}
      {hasWaterMark && <Watermark size={3} currentTime={currentTime} />}
    </div>
  )
}

Thumbnail.propTypes = propTypes
Thumbnail.defaultProps = defaultProps
export default Thumbnail
