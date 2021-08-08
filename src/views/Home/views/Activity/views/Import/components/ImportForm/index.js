import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import { isEmpty, isUndefined } from 'lodash'

// Components
import Modal, { withModal } from '@/basicComponents/Modal'
import Typography from '@/basicComponents/Typography'
import Button from '@/basicComponents/Button'
import Icon from '@/basicComponents/Icon'
import ErrorMessage from '@/basicComponents/Form/ErrorMessage'

// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onClose: PropTypes.func,
}

function ImportForm(props) {
  const { onClose } = props
  const { submitForm, setFieldValue, errors, touched, values } = useFormikContext()
  const { file } = values

  const defaultFileName = '選擇檔案'
  const onChange = e => {
    const file = e.currentTarget.files[0]
    if (isUndefined(file)) return

    setFieldValue('file', file)
  }

  return (
    <>
      <Modal.Body align='flex-start' padding='16px 24px'>
        <Typography.Title level='h4' color='primary-darkest' className={cx('import-form__title')}>
          注章事項:
        </Typography.Title>
        <Typography.Title level='h5' color='gray-darker' className={cx('import-form__description')}>
          ． 檔案格式僅支援: xls或xlsx檔。
        </Typography.Title>
        <Typography.Title level='h5' color='gray-darker' className={cx('import-form__description')}>
          ． 檔案大小須在100mb以下。
        </Typography.Title>
        <label className={cx('import-form__label', { error: !isEmpty(errors) && !isEmpty(touched) })}>
          <input type='file' accept='.xls, .xlsx' className={cx('import-form__file')} onChange={onChange} />
          <Typography.Text className={cx('import-form__file-name', { empty: file === '' })}>
            {isEmpty(file.name) ? defaultFileName : file.name}
          </Typography.Text>
          <Icon.Upload className={cx('import-form__icon')}></Icon.Upload>
        </label>
        <ErrorMessage name='file' />
      </Modal.Body>
      <Modal.Footer>
        <Button type='primary' className={cx('import-form__button')} onClick={() => submitForm()}>
          匯入
        </Button>
        <Button onClick={onClose}>取消</Button>
      </Modal.Footer>
    </>
  )
}

ImportForm.propTypes = propTypes

export default withModal(ImportForm)
