// Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Lib MISC
import { usePopoverExpandState } from './eventHandler/methods/usePopoverExpandState'
import { useUploadListValue } from './eventHandler/computedValues/useUploadListValue'
import useUploadListState from '@/views/Home/eventHandler/shareComputedValues/useUploadListState'
import { useUploadTitleValue } from './eventHandler/computedValues/useUploadTitleValue'
import { useRemainingTimeValue } from './eventHandler/computedValues/useRemainingTimeValue'
import { getTotalListHeight } from './eventHandler/methods/getTotalListHeight'

// Components
import CSSTransition, { getClassNames } from '@/basicComponents/CSSTransition'
import Scrollbars from '@/basicComponents/Scrollbar'
import UploadItem from './components/UploadItem'
import Icon from '@/basicComponents/Icon'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  history: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function UploadPopover(props) {
  const { uploadList, uploadItems } = useUploadListValue()
  const uploadListState = useUploadListState(uploadList, uploadItems)
  const headerTitle = useUploadTitleValue(uploadItems, uploadListState)
  const remainingTime = useRemainingTimeValue(uploadItems, uploadListState)
  const { isPopoverExpand, handlePopoverExpandState } = usePopoverExpandState()
  const totalListHeight = getTotalListHeight(uploadItems)
  const isUploading = uploadListState === 'uploading'

  return ReactDOM.createPortal(
    <CSSTransition in={!isEmpty(uploadItems)} timeout={300} classNames={getClassNames(cx, 'upload-popover')} unmountOnExit>
      <div className={cx('upload-popover')}>
        <div data-is-uploading={isUploading} className={cx('upload-popover__header')}>
          <div className={cx('upload-popover__title')}>{headerTitle}</div>
          <div className={cx('upload-popover__remaining-time')}>{remainingTime}</div>

          <button className={cx('upload-popover__button')} onClick={handlePopoverExpandState}>
            <Icon.Arrow className={cx('upload-popover__icon')} data-is-popover-expend={isPopoverExpand} />
          </button>
        </div>

        <ul style={{ height: isPopoverExpand ? totalListHeight : 0 }} className={cx('upload-popover__list')}>
          <Scrollbars>
            {uploadItems.map((uploadItemData, index) => (
              <UploadItem key={index} uploadItemData={uploadItemData} />
            ))}
          </Scrollbars>
        </ul>
      </div>
    </CSSTransition>,
    document.body,
  )
}

UploadPopover.propTypes = propTypes
UploadPopover.defaultProps = defaultProps

export default UploadPopover
