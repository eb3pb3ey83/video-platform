import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useFormikContext } from 'formik'

import { handleValuesChange } from '../MediaFilter/eventHandler/methods/handleValuesChange'

// Components
import Form from '@/basicComponents/Form'
import FormItem from '@/views/Home/sharedComponents/FormItem'
import Button from '@/basicComponents/Button'
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
  placeOptions: PropTypes.array,
  organizationOptions: PropTypes.array,
  activityDateRange: PropTypes.object,
}

function MediaFilter(props) {
  const { className, placeOptions, organizationOptions, activityDateRange } = props

  const { values, setFieldValue, submitForm } = useFormikContext()

  const { fileNo } = values

  const { handleResetNumber, handleResetAllExceptFileNo } = handleValuesChange(setFieldValue, activityDateRange)

  return (
    <div className={cx('media-filter', className)}>
      <div className={cx('media-filter-column')}>
        <FormItem name='日期' nameWidth={70} marginBottom={16} maxHeight={34}>
          <Form.DateInputField
            className={cx('media-filter__rangepicker')}
            startDateField='startDate'
            endDateField='endDate'
            handleResetNumber={handleResetNumber}
          />
        </FormItem>
        <FormItem name='活動名稱' nameWidth={70} marginBottom={16} maxHeight={34}>
          <Form.MultiCreateInputField
            className={cx('media-filter__multi-create-input')}
            placeholder='請輸入活動名稱關鍵字來搜索檔案'
            name='eventName'
            maxLength={3}
            height={34}
            onChange={handleResetNumber}
            fileNo={fileNo}
          />
          <p className={cx('media-filter__description')}>至多3組，每組輸入後，按enter鍵出現X鍵後鎖定</p>
        </FormItem>
        <FormItem name='關鍵字' nameWidth={70} marginBottom={16} maxHeight={34}>
          <Form.MultiCreateInputField
            className={cx('media-filter__multi-create-input')}
            placeholder='請輸入其他關鍵字來搜索檔案'
            name='keyword'
            maxLength={5}
            height={34}
            onChange={handleResetNumber}
            fileNo={fileNo}
          />
          <p className={cx('media-filter__description')}>至多5組，每組輸入後，按enter鍵出現X鍵後鎖定</p>
        </FormItem>
        <FormItem name='檔案編號' nameWidth={70} marginBottom={16}>
          <Form.InputField
            className={cx('media-filter__input')}
            placeholder='單以檔案編號查詢'
            name='fileNo'
            isOnlyNumber
            onChange={handleResetAllExceptFileNo}
          />
        </FormItem>
      </div>

      <div className={cx('media-filter-column')}>
        <Form.RadioGroupField className={cx('media-filter__radio-group')} group='accessAuthority' onChange={handleResetNumber}>
          <Form.RadioField label='公開' value={ACCESS_AUTHORITY.PUBLIC}></Form.RadioField>
          <Form.RadioField label='全部(含不公開)' value={ACCESS_AUTHORITY.ALL}></Form.RadioField>
        </Form.RadioGroupField>
        <FormItem name='市場' nameWidth={120} marginBottom={16}>
          <Form.SelectField
            className={cx('media-filter__select')}
            options={placeOptions}
            placeholder='請輸入單一國家或洲別'
            name='placeId'
            handleResetNumber={handleResetNumber}
          />
        </FormItem>
        <FormItem name='單位' nameWidth={120} marginBottom={16}>
          <Form.SelectField
            className={cx('media-filter__select')}
            options={organizationOptions}
            name='organizationId'
            handleResetNumber={handleResetNumber}
          />
        </FormItem>
        <FormItem name='工作計畫編號' nameWidth={120} marginBottom={16} maxHeight={34}>
          <Form.InputField
            className={cx('media-filter__input')}
            placeholder='請輸入7碼工作計畫編號'
            maxLength={7}
            size='sm'
            name='projectNo'
            onChange={handleResetNumber}
          />
        </FormItem>
        <div className={cx('media-filter-column--flexend')}>
          <Button
            className={cx('media-filter__button')}
            size='sm'
            type='primary'
            htmlType='submit'
            prefix={<Icon.Search />}
            onClick={() => submitForm()}
          >
            搜尋
          </Button>
        </div>
      </div>
    </div>
  )
}

MediaFilter.propTypes = propTypes

export default MediaFilter
