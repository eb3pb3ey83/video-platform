import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { Formik, Form as FormikForm } from 'formik'
import formikConfig from './formikConfig'

// Components / Views
import Field from '@/basicComponents/Field'
import Button from '@/basicComponents/Button'

const cx = classnames.bind(styles)

function Form(props) {
  return (
    <div className={cx('form')}>
      <Formik {...formikConfig(props)}>
        {({ isValid, isSubmitting, status }) => (
          <>
            <FormikForm className={cx('form-content')}>
              <Field label='帳號' type='text' name='account' />
              <Field label='密碼' type='password' name='password' />
              {typeof status === 'object' && typeof status.message === 'string' && <div style={{ color: 'red' }}>{status.message}</div>}
              <Button className={cx('form-content__button')} htmlType='submit' type='primary' isFilled isBlock disabled={isSubmitting || !isValid}>
                登入
              </Button>
            </FormikForm>
          </>
        )}
      </Formik>
    </div>
  )
}

export default Form
