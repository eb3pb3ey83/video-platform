import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'

// Components
import Button from '@/basicComponents/Button'
import MediaInfoColumn from '../../../../sharedComponents/MediaInfoColumn'
// Lib MISC

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onModeChange: PropTypes.func,
}

function Edit(props) {
  const { onModeChange } = props
  const formikContext = useFormikContext()
  const { resetForm } = formikContext

  return (
    <MediaInfoColumn gridArea='button'>
      <Button
        onClick={() => onModeChange(resetForm)}
        isBlock
        className={cx('media-info__cancel-edit-button')}
        size='sm'
        type='default'
        htmlType='button'
      >
        取消
      </Button>
      <Button isBlock className={cx('media-info__confirm-edit-button')} size='sm' type='primary' htmlType='submit'>
        確定變更
      </Button>
    </MediaInfoColumn>
  )
}

Edit.propTypes = propTypes

export default Edit
