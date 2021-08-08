import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'
import IconTitle from '@/basicComponents/IconTitle'
import MediaInfoColumn from '../../sharedComponents/MediaInfoColumn'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  attachmentId: PropTypes.string,
  data: PropTypes.shape({
    attachmentId: PropTypes.number,
    accessAuthority: PropTypes.number,
    downloadCount: PropTypes.string,
    viewCount: PropTypes.string,
    fileFormat: PropTypes.string,
    fileLength: PropTypes.string,
    deptName: PropTypes.string,
    createdUser: PropTypes.string,
    updatedUser: PropTypes.string,
    updatedTime: PropTypes.string,
    description: PropTypes.string,
    projectNo: PropTypes.string,
    leader: PropTypes.string,
    keywords: PropTypes.string,
    language: PropTypes.string,
    place: PropTypes.string,
    customizekeywords: PropTypes.string.array,
  }),
}

function MediaInfo(props) {
  const { data } = props
  const { attachmentId, fileFormat, viewCount, downloadCount, fileLength, deptName, createdUser, updatedUser, updatedTime } = data

  return (
    <>
      <MediaInfoColumn gridArea='media-info'>
        <div className={cx('media-info__column-zone')}>
          <IconTitle titleName='媒體資訊'>
            <Icon.Media role='media-icon' />
          </IconTitle>
          <FormItem name='檔案編號' isViewMode>
            {attachmentId}
          </FormItem>
          <FormItem name='檔案格式' isViewMode>
            {fileFormat}
          </FormItem>
          <FormItem name='瀏覽次數' isViewMode>
            <span style={{ color: 'orange' }}>{viewCount}</span>
          </FormItem>
          <FormItem name='下載次數' isViewMode>
            <span style={{ color: 'orange' }}>{downloadCount}</span>
          </FormItem>
          <FormItem name='影片長度' isViewMode>
            <span style={{ color: 'orange' }}>{fileLength}</span>
          </FormItem>
        </div>
      </MediaInfoColumn>

      <MediaInfoColumn gridArea='permission'>
        <div className={cx('media-info__column-zone')}>
          <IconTitle titleName='管理權限'>
            <Icon.Man role='media-icon' />
          </IconTitle>
          <FormItem name='上傳單位' isViewMode>
            {deptName}
          </FormItem>
          <FormItem name='上傳者' isViewMode>
            {createdUser}
          </FormItem>
          <FormItem name='最後編輯者' isViewMode>
            {updatedUser} <span style={{ color: 'orange' }}>{updatedTime}</span>
          </FormItem>
        </div>
      </MediaInfoColumn>
    </>
  )
}

MediaInfo.propTypes = propTypes

export default MediaInfo
