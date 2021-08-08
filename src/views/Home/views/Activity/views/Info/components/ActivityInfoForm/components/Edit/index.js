import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import ActivityInfoColumn from '../../../../sharedComponents/ActivityInfoColumn'
import FormItem from '@/views/Home/sharedComponents/FormItem'
import Form from '@/basicComponents/Form'
import Input from '@/basicComponents/Input'

// Lib MISC
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'

// Variables / Functions
const cx = classnames.bind(styles)

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

function Edit(props) {
  const { data, permissions, eventId } = props
  const { placeOptions } = usePlaceOptions({ hasAll: false, isQuery: false })

  return (
    <>
      <ActivityInfoColumn>
        <FormItem name='名稱' maxHeight={40}>
          <div className={cx('activity-info__name-editor')}>
            <Form.InputField className={cx('activity-info__year')} name='eventName.year' maxLength={4} />
            <Form.InputField className={cx('activity-info__name')} name='eventName.name' maxLength={75} />
          </div>
        </FormItem>

        <FormItem name='序號' maxHeight={40}>
          <Input value={eventId} className={cx('activity-info__input')} readOnly disabled />
        </FormItem>

        <FormItem name='時間' maxHeight={40}>
          <Form.DateInputField className={cx('activity-info__input')} startDateField='startDate' endDateField='endDate' height={40} />
        </FormItem>

        <FormItem name='市場(選填)' maxHeight={40}>
          <Form.SelectField className={cx('activity-info__input')} options={placeOptions} name='place' height={40} />
        </FormItem>
      </ActivityInfoColumn>

      <ActivityInfoColumn className={cx('activity-info__second-column')}>
        <FormItem name='單位' maxHeight={40}>
          <Input className={cx('activity-info__input')} value={data.deptName} readOnly disabled />
        </FormItem>

        <FormItem name='活動建立者' maxHeight={40}>
          <Input className={cx('activity-info__input')} value={data.createdUser} readOnly disabled />
        </FormItem>

        <FormItem name='最後編輯時間' maxHeight={40}>
          <Input className={cx('activity-info__input')} value={`${data.updatedUser} ${data.updatedTime}`} readOnly disabled />
        </FormItem>

        {permissions.isShowContact && (
          <FormItem name='聯絡人' maxHeight={40}>
            <Form.InputField className={cx('activity-info__input')} name='contact' />
          </FormItem>
        )}
      </ActivityInfoColumn>
    </>
  )
}

Edit.propTypes = propTypes

export default Edit
