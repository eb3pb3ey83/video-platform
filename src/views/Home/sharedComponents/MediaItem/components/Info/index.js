import React from 'react'
import styles from './style.module.scss'
import classnames from 'classnames/bind'
import PropTypes from 'prop-types'

// Components
import Detail from './components/Detail'

// Lib MISC
import { useHandlePopoverMode } from './eventHandler/methods/useHandlePopoverMode'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  eventName: PropTypes.string,
  organization: PropTypes.object,
  description: PropTypes.string,
}

function Info(props) {
  const { eventName, organization, description } = props
  const { departmentName } = organization

  const { isPopoverOpened, togglePopoverMode } = useHandlePopoverMode()

  return (
    <div className={cx('media-info-wrapper')} onMouseMove={() => togglePopoverMode(true)} onMouseLeave={() => togglePopoverMode(false)}>
      <p className={cx('media-info__title')}>{eventName}</p>
      <p className={cx('media-info__department')}>{departmentName}</p>
      <p className={cx('media-info__description')}>{description}</p>
      <Detail isOpened={isPopoverOpened} eventName={eventName} departmentName={departmentName} description={description} />
    </div>
  )
}

Info.propTypes = propTypes

export default Info
