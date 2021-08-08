import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { FieldArray, useFormikContext } from 'formik'
// import PropTypes from 'prop-types'

// Components
import Scrollbars from '@/basicComponents/Scrollbar'
import Typography from '@/basicComponents/Typography'
import Button from '@/basicComponents/Button'
import Form from '@/basicComponents/Form'
import Icon from '@/basicComponents/Icon'

// Lib MISC
import { start } from '@/utils/start-flow'
import { getTotalListHeight } from './eventHandler/methods/getTotalListHeight'
import { checkEventName } from './eventHandler/methods/checkEventName'
import { getEventName } from './eventHandler/methods/getEventName'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function EventList(props) {
  const { values, errors, setErrors, setFieldValue, setFieldError, setFieldTouched } = useFormikContext()
  const totalListHeight = getTotalListHeight(values.eventId, errors.eventId)

  return (
    <FieldArray name='eventId'>
      {arrayHelpers => (
        <>
          <div style={{ height: totalListHeight, maxHeight: 156 }} className={cx('premission-creator-activity-field-wrapper')}>
            <Scrollbars autoHide={false}>
              {values.eventId.map((item, index) => (
                <div key={index} className={cx('premission-creator-activity-field')}>
                  <div className={cx('premission-creator-icon-wrapper')}>{index + 1}.</div>

                  <Form.InputField
                    onBlur={start(() =>
                      checkEventName({ values, setFieldValue, setFieldError, setFieldTouched, id: item.id, index }),
                    ).end(checkedResult =>
                      getEventName({ checkedResult, values, errors, setErrors, setFieldValue, setFieldError, setFieldTouched, id: item.id, index }),
                    )}
                    className={cx('premission-creator-input')}
                    name={`eventId.${index}.id`}
                  />

                  <Form.InputField disabled name={`eventId.${index}.name`} className={cx('premission-creator-input')} />

                  <div className={cx('premission-creator-icon-wrapper')}>
                    <button onClick={() => arrayHelpers.remove(index)} disabled={index === 0 && values.eventId.length === 1}>
                      <Icon.Delete className={cx('premission-creator-icon-wrapper__delete-icon')} />
                    </button>
                  </div>
                </div>
              ))}
            </Scrollbars>

            <Button shape='rounded' className={cx('premission-creator-add-button')} onClick={() => arrayHelpers.push({ id: '', name: '' })}>
              新增申請活動
            </Button>
          </div>

          <Typography.Hr className={cx('premission-creator-line')} />
        </>
      )}
    </FieldArray>
  )
}

EventList.propTypes = propTypes

export default EventList
