import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { onRotateButtonClick } from './eventHandler/methods/onRotateButtonClick'

// Variables / Functions

const cx = classnames.bind(styles)

export const defaultProps = {
  hasWaterMark: true,
  isUploading: false,
  isShowControlBar: false,
  type: '',
  imageAngleList: [],
}

export const propTypes = {
  isHidden: PropTypes.bool,
  hasDeleteFeature: PropTypes.bool,
  isShowImageDisplay: PropTypes.bool,
  currentImageAngle: PropTypes.number,
  fieldName: PropTypes.string,
  setFieldValue: PropTypes.func,
  onFileDelete: PropTypes.func,
}

function MediaController(props) {
  const { setFieldValue, isHidden, isShowImageDisplay, onFileDelete, hasDeleteFeature, currentImageAngle, fieldName } = props

  return (
    <div className={cx('media-thumbnail-control')} data-is-hidden={isHidden} onClick={e => e.stopPropagation()}>
      {isShowImageDisplay && (
        <button
          type='button'
          onClick={() => onRotateButtonClick(setFieldValue, fieldName, currentImageAngle)}
          className={cx('media-thumbnail-control__button')}
        >
          <Icon.Rotate />
        </button>
      )}
      {hasDeleteFeature && (
        <button onClick={onFileDelete} type='button' className={cx('media-thumbnail-control__button')}>
          <Icon.Delete className={cx('media-thumbnail-control__icon')} />
        </button>
      )}
    </div>
  )
}

MediaController.propTypes = propTypes
MediaController.defaultProps = defaultProps
export default MediaController
