import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { useGlobalState } from '@/globalState/'
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'
import { useActivityTemplateOptions } from '../../eventHandler/computedValues/useActivityTemplateOptions'
import { isEmpty } from 'lodash'

// Components
import Modal, { withModal } from '@/basicComponents/Modal'
import Typography from '@/basicComponents/Typography'
import Button from '@/basicComponents/Button'
import Form from '@/basicComponents/Form'
import VerticalFormItem from '@/views/Home/sharedComponents/VerticalFormItem'

// Lib MISC
import { getCurrentOrganization } from '@/utils/getUserInfo'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onClose: PropTypes.func,
}

function ActivityCreatorForm(props) {
  const { onClose } = props
  const [state] = useGlobalState()
  const { user } = state
  const { userInfo } = user
  const { placeOptions } = usePlaceOptions()
  const { activityTemplateOptions } = useActivityTemplateOptions()
  const { departmentName } = getCurrentOrganization()
  const formikContext = useFormikContext()
  const { setFieldValue, submitForm } = formikContext

  return (
    <>
      <Modal.Body align='flex-start' padding='16px 32px'>
        <div className={cx('activity-creator')}>
          <div className={cx('activity-creator-info')}>
            <div className={cx('activity-creator-info-row')}>
              <Typography.Text className={cx('activity-creator-info-row__title')} color='primary-darkest'>
                ． 單位
              </Typography.Text>
              <Typography.Text className={cx('activity-creator-info-row__content')} color='primary-darkest'>
                {departmentName}
              </Typography.Text>
            </div>
            <div className={cx('activity-creator-info-row')}>
              <Typography.Text className={cx('activity-creator-info-row__title')} color='primary-darkest'>
                ． 活動建立者
              </Typography.Text>
              <Typography.Text className={cx('activity-creator-info-row__content')} color='primary-darkest'>
                {`${userInfo.employeeName} [員編：${userInfo.employeeId}]`}
              </Typography.Text>
            </div>
          </div>

          <Typography.Hr />

          <VerticalFormItem title='範本(選填)'>
            <Form.SelectField
              height='40px'
              onChange={option => {
                setFieldValue('activityStartDate', option.templateStartDate)
                setFieldValue('activityEndDate', option.templateEndDate)
                setFieldValue('activityYear', option.templateYear)
                setFieldValue('activityName', option.value)
                setFieldValue('placeId', option.templatePlaceId)
                setFieldValue('placeName', option.templatePlaceName)
                setFieldValue('activityContact', option.templateContact)
              }}
              options={activityTemplateOptions}
              placeholder={isEmpty(activityTemplateOptions) ? '目前無任何範本提供' : '請選擇範本活動'}
              name='templateName'
              isDisabled={isEmpty(activityTemplateOptions)}
            />
          </VerticalFormItem>

          <VerticalFormItem title='名稱'>
            <div className={cx('activity-creator-field-row')}>
              <div className={cx('activity-creator-field__input-wrapper')}>
                <Form.InputField
                  onChange={value => {
                    setFieldValue('activityStartDate', `${value}/01/01`)
                    setFieldValue('activityEndDate', `${value}/12/31`)
                  }}
                  className={cx('activity-creator-field__input')}
                  maxLength={4}
                  name='activityYear'
                />
              </div>

              <Form.FlexibleTextareaField className={cx('activity-creator-field__flexibleTextarea')} maxLength={75} name='activityName' />
            </div>
          </VerticalFormItem>

          <VerticalFormItem title='活動日期'>
            <Form.DateInputField
              className={cx('activity-creator-field__rangepicker')}
              startDateField='activityStartDate'
              endDateField='activityEndDate'
              height={40}
            />
          </VerticalFormItem>

          <VerticalFormItem title='市場(選填)'>
            <Form.SelectField height='40px' options={placeOptions} placeholder='請選擇國家／洲別' name='placeId' />
          </VerticalFormItem>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button type='primary' className={cx('activity-creator-button')} onClick={() => submitForm()}>
          新增
        </Button>
        <Button className={cx('activity-creator-button')} onClick={onClose}>
          取消
        </Button>
      </Modal.Footer>
    </>
  )
}

ActivityCreatorForm.propTypes = propTypes

export default withModal(ActivityCreatorForm)
