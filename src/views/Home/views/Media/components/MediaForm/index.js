import React from 'react'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

// Components
import Layout from '@/basicComponents/Layout'
import MediaFilter from './components/MediaFilter'
import MediaList from '@/views/Home/sharedComponents/MediaList'

// Lib MISC
import { usePlaceOptions } from '@/views/Home/eventHandler/shareComputedValues/usePlaceOptions'
import { useOrganizationOptions } from '@/views/Home/eventHandler/shareComputedValues/useOrganizationOptions'
import { useActivityDateRange } from '@/views/Home/eventHandler/shareComputedValues/useActivityDateRange'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  mediaData: PropTypes.object,
  isMediaListFetched: PropTypes.bool,
  onLoadMoreClick: PropTypes.func,
  onMediaTypeClick: PropTypes.func,
  isFiltered: PropTypes.bool,
}

function MediaForm(props) {
  const { placeOptions } = usePlaceOptions({ hasAll: true, isQuery: true })
  const { organizationOptions } = useOrganizationOptions()
  const { activityDateRange } = useActivityDateRange()

  const { mediaData, isMediaListFetched, onLoadMoreClick, onMediaTypeClick, isFiltered } = props

  const { imageAmount, videoAmount, currentTime } = mediaData

  return (
    <Layout className={cx('media')}>
      <MediaFilter placeOptions={placeOptions} organizationOptions={organizationOptions} activityDateRange={activityDateRange} />
      <MediaList
        isMediaListFetched={isMediaListFetched}
        mediaData={mediaData}
        onLoadMoreClick={onLoadMoreClick}
        onMediaTypeClick={onMediaTypeClick}
        isFiltered={isFiltered}
        imageAmount={imageAmount}
        videoAmount={videoAmount}
        currentTime={currentTime}
      />
    </Layout>
  )
}

MediaForm.propTypes = propTypes

export default withRouter(MediaForm)
