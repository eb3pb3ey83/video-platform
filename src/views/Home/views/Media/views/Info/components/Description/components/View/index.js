import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Icon from '@/basicComponents/Icon'
import IconTitle from '@/basicComponents/IconTitle'
import MediaInfoColumn from '../../../../sharedComponents/MediaInfoColumn'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Lib MISC
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
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
    fileReason: PropTypes.string,
  }),
  eventId: PropTypes.number,
}

function View(props) {
  const { data, eventId } = props
  const { accessAuthority, description, projectNo, leader, keywords, language, place, customizekeywords, fileReason } = data
  const accessAuthorityForView = accessAuthority === ACCESS_AUTHORITY.PUBLIC ? '公開' : `不公開 - ${fileReason}`

  return (
    <MediaInfoColumn gridArea='description-info'>
      <div className={cx('media-info__column-zone')}>
        <IconTitle titleName='圖說資訊'>
          <Icon.Info role='media-icon' />
        </IconTitle>

        <FormItem isViewMode>{accessAuthorityForView}</FormItem>

        <FormItem name='描述' isViewMode>
          {description}
        </FormItem>

        <FormItem name='活動編號' isViewMode>
          {eventId}
        </FormItem>

        <FormItem name='工作計畫編號' isViewMode>
          {projectNo}
        </FormItem>

        <FormItem name='首長' isViewMode>
          {leader}
        </FormItem>

        <FormItem name='關鍵字' isViewMode>
          {keywords}
        </FormItem>

        <FormItem name='影音發音語言' isViewMode>
          {language}
        </FormItem>

        <FormItem name='市場' isViewMode>
          {place}
        </FormItem>

        <FormItem name='自訂關鍵字' isViewMode>
          {customizekeywords}
        </FormItem>
      </div>
    </MediaInfoColumn>
  )
}

View.propTypes = propTypes

export default View
