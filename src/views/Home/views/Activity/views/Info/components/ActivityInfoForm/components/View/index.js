import React from 'react'
import PropTypes from 'prop-types'

// Components
import ActivityInfoColumn from '../../../../sharedComponents/ActivityInfoColumn'
import FormItem from '@/views/Home/sharedComponents/FormItem'

// Lib MISC

// Variables / Functions

export const propTypes = {
  eventId: PropTypes.string,
  data: PropTypes.shape({
    eventName: PropTypes.string,
    period: PropTypes.string,
    place: PropTypes.string,
    deptName: PropTypes.string,
    createdUser: PropTypes.string,
    updatedUser: PropTypes.string,
    updatedTime: PropTypes.string,
    contact: PropTypes.string,
  }),
  permissions: PropTypes.shape({
    isShowContact: PropTypes.bool,
    isShowEditButton: PropTypes.bool,
    isShowRemoveButton: PropTypes.bool,
    isShowUploadButton: PropTypes.bool,
  }),
}

function View(props) {
  const { data, permissions, eventId } = props
  const { eventName, period, place, deptName, createdUser, updatedUser, updatedTime, contact } = data

  return (
    <>
      <ActivityInfoColumn>
        <FormItem name='名稱' isViewMode>
          {eventName}
        </FormItem>
        <FormItem name='序號' isViewMode>
          {eventId}
        </FormItem>
        <FormItem name='日期' isViewMode>
          {period}
        </FormItem>
        <FormItem name='市場' isViewMode>
          {place}
        </FormItem>
      </ActivityInfoColumn>

      <ActivityInfoColumn>
        <FormItem name='單位' isViewMode>
          {deptName}
        </FormItem>
        <FormItem name='活動建立者' isViewMode>
          {createdUser}
        </FormItem>
        <FormItem name='最後編輯時間' isViewMode>
          {updatedUser} <span style={{ color: 'orange' }}>{updatedTime}</span>
        </FormItem>
        {permissions.isShowContact && (
          <FormItem name='聯絡人' isViewMode>
            {contact}
          </FormItem>
        )}
      </ActivityInfoColumn>
    </>
  )
}

View.propTypes = propTypes

export default View
