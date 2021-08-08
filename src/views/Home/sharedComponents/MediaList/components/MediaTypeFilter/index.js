import React from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import classnames from 'classnames/bind'

// Components
import FilterButton from '@/basicComponents/FilterButton'

// Style
import styles from './style.module.scss'

// Variables / Functions
import { MEDIA_TYPE } from '@/constants/MEDIA_TYPE'
const cx = classnames.bind(styles)

export const defaultProps = {
  onMediaTypeClick: () => {},
  isActivity: false,
  isFiltered: false,
}

export const propTypes = {
  isActivity: PropTypes.bool,
  onMediaTypeClick: PropTypes.func,
  isFiltered: PropTypes.bool,
  imageAmount: PropTypes.number,
  videoAmount: PropTypes.number,
}

function MediaTypeFilter(props) {
  const { isActivity, onMediaTypeClick: onMediaTypeClickProps, isFiltered, imageAmount, videoAmount } = props

  const { values, setFieldValue } = useFormikContext()
  const { mediaType } = values

  const onMediaTypeClick = mediaType => {
    onMediaTypeClickProps(mediaType)
    setFieldValue('mediaType', mediaType)
  }

  return (
    <div className={cx('media-type')} data-is-activity={isActivity}>
      <FilterButton.Group className={cx('media-type-filter')}>
        <FilterButton shape='rounded' size='md' onClick={() => onMediaTypeClick(MEDIA_TYPE.ALL)} isActive={mediaType === MEDIA_TYPE.ALL}>
          全部
        </FilterButton>
        <FilterButton shape='rounded' size='md' onClick={() => onMediaTypeClick(MEDIA_TYPE.IMAGE)} isActive={mediaType === MEDIA_TYPE.IMAGE}>
          照片
        </FilterButton>
        <FilterButton shape='rounded' size='md' onClick={() => onMediaTypeClick(MEDIA_TYPE.VIDEO)} isActive={mediaType === MEDIA_TYPE.VIDEO}>
          影片
        </FilterButton>
      </FilterButton.Group>
      {(isActivity || isFiltered) && (
        <div className={cx('media-amount')}>
          <p className={cx('media-amount__text')}>{isFiltered ? '搜尋結果：' : '此活動含有：'}</p>
          <p className={cx('media-amount__number')}>{imageAmount}</p>
          <p className={cx('media-amount__text')}>照片</p>
          <p className={cx('media-amount__number')}>{videoAmount}</p>
          <p className={cx('media-amount__text')}>影片</p>
        </div>
      )}
    </div>
  )
}

MediaTypeFilter.defaultProps = defaultProps
MediaTypeFilter.propTypes = propTypes

export default MediaTypeFilter
