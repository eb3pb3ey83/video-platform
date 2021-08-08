import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { useFormikContext } from 'formik'
import { isEmpty } from 'lodash'
// import PropTypes from 'prop-types'

// Components
import Modal, { withModal } from '@/basicComponents/Modal'
import Button from '@/basicComponents/Button'
import Form from '@/basicComponents/Form'
import VerticalFormItem from '@/views/Home/sharedComponents/VerticalFormItem'
import EventList from './components/EventList'

// Lib MISC
import { useOrganizationOptions } from './eventHandler/computedValues/useOrganizationOptions'
import userOptionsUrl, { fetchUserOptions } from '@/api/fetchUserOptions'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function PermissionCreatorForm(props) {
  const { values, setFieldValue, submitForm } = useFormikContext()
  const organizationOptions = useOrganizationOptions(values, setFieldValue)

  return (
    <>
      <Modal.Body align='flex-start' padding='16px 32px'>
        <div className={cx('premission-creator-header')}>
          <VerticalFormItem title='*申請者' marginBottom={24}>
            <Form.AsyncSelectField
              height={40}
              placeholder='請輸入申請者姓名'
              name='applicant'
              loadOptions={userName => fetchUserOptions(userOptionsUrl, { userName: userName.replace(/\d/g, '') })}
              onBlur={inputValue => isEmpty(inputValue) && setFieldValue('applicant', {})}
            />
          </VerticalFormItem>

          <VerticalFormItem title='*部門' marginBottom={24}>
            <Form.SelectField
              isDisabled={isEmpty(values.applicant)}
              placeholder='請選擇申請者部門'
              height={40}
              options={organizationOptions}
              name='organizationId'
            />
          </VerticalFormItem>
        </div>

        <VerticalFormItem title='*可下載時間' width='100%' marginBottom={24}>
          <Form.DateInputField className={cx('premission-creator-range-picker')} startDateField='startDate' endDateField='endDate' height={40} />
        </VerticalFormItem>

        <VerticalFormItem title='*申請活動名稱' width='100%'>
          <div className={cx('premission-creator-help')}>． 請輸入一至多個活動做開放</div>
          <EventList />
        </VerticalFormItem>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => submitForm()} htmlType='submit' type='primary' className={cx('activity-creator-button')}>
          開放權限
        </Button>
      </Modal.Footer>
    </>
  )
}

PermissionCreatorForm.propTypes = propTypes

export default withModal(PermissionCreatorForm)
