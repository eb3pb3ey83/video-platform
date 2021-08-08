import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '@/basicComponents/Button'

// Style
import styles from './style.module.scss'
import Form from '@/basicComponents/Form'
import { Formik } from 'formik'
import getValidationSchema from './eventHandler/methods/getValidationSchema'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  categoryName: PropTypes.string,
  updateRowData: PropTypes.func,
  cancelRowData: PropTypes.func,
}

function EditRow(props) {
  const { item, index, categoryName, updateRowData, cancelRowData } = props
  const validationSchema = getValidationSchema()

  return (
    <Formik initialValues={item} onSubmit={(values, actions) => updateRowData(values, actions, item, index)} validationSchema={validationSchema}>
      {formikProps => {
        const { handleBlur, handleChange } = formikProps
        return (
          <div className={cx('edit_row-wrapper')}>
            <div>{index + 1}.&nbsp;</div>
            <Form className={cx('edit_row-form')}>
              <Form.InputField
                className={cx('edit_row-input')}
                name='itemName'
                maxLength={20}
                placeholder={`請輸入${categoryName}`}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={cx('edit_row-buttons')}>
                <Button size='sm' type='default' isFilled htmlType='submit' className={cx('edit_row-buttons-submit_btn')}>
                  確定
                </Button>
                <Button size='sm' type='default' isFilled htmlType='button' onClick={event => cancelRowData(item, index)}>
                  取消
                </Button>
              </div>
            </Form>
          </div>
        )
      }}
    </Formik>
  )
}

EditRow.propTypes = propTypes

export default EditRow
