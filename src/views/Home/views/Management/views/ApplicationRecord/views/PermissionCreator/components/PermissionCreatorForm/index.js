import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { FieldArray, useFormikContext } from 'formik'
// import PropTypes from 'prop-types'

// Components
import Modal, { withModal } from '@/basicComponents/Modal'
import Button from '@/basicComponents/Button'
import Form from '@/basicComponents/Form'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function PermissionCreatorForm(props) {
  const { values } = useFormikContext()

  return (
    <>
      <Modal.Body align='flex-start' padding='16px 32px'>
        test
        <FieldArray name='test'>
          {arrayHelpers => (
            <>
              <Button type='primary' onClick={() => arrayHelpers.push('')}>
                add
              </Button>
              {values.test.map((item, index) => (
                <div key={index}>
                  <Form.InputField maxLength={4} name={`test.${index}`} />
                  <Button type='primary' onClick={() => arrayHelpers.remove(index)}>
                    remove
                  </Button>
                </div>
              ))}
            </>
          )}
        </FieldArray>
      </Modal.Body>
      <Modal.Footer align='center'>
        <Button type='primary' className={cx('activity-creator-button')}>
          開放權限
        </Button>
      </Modal.Footer>
    </>
  )
}

PermissionCreatorForm.propTypes = propTypes

export default withModal(PermissionCreatorForm)
