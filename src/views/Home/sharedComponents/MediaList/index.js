import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useHistory } from 'react-router-dom'
import { isEmpty } from 'lodash'

// Components
import Panel from '@/basicComponents/Panel'
import MediaItem from '@/views/Home/sharedComponents/MediaItem'
import MediaTypeFilter from './components/MediaTypeFilter'
import EmptyData from '@/basicComponents/EmptyData'
import Icon from '@/basicComponents/Icon'
import Spinner from '@/basicComponents/Spinner'
import Overlay from '@/basicComponents/Overlay'
import ButtonLoadmore from '@/views/Home/sharedComponents/ButtonLoadmore'

// Style
import styles from './style.module.scss'

// Lib MISC
import { redirectToInfo } from './eventHandler/methods/redirectToInfo'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  isActivity: PropTypes.bool,
  isEditMode: PropTypes.bool,
  isMediaListFetched: PropTypes.bool,
  mediaData: PropTypes.object,
  onLoadMoreClick: PropTypes.func,
  onMediaTypeClick: PropTypes.func,
  eventId: PropTypes.string,
  isFiltered: PropTypes.bool,
  imageAmount: PropTypes.number,
  videoAmount: PropTypes.number,
  currentTime: PropTypes.string,
}

function MediaList(props) {
  const {
    isActivity,
    isEditMode,
    isMediaListFetched,
    mediaData,
    onLoadMoreClick,
    onMediaTypeClick,
    eventId,
    isFiltered,
    imageAmount,
    videoAmount,
    currentTime,
  } = props
  const { mediaList, hasMore } = mediaData

  const history = useHistory()

  const hasMedia = !isEmpty(mediaList)

  return (
    <>
      <Panel className={cx('media-panel')} isScrollable={false} data-is-activity={isActivity}>
        <MediaTypeFilter
          isActivity={isActivity}
          onMediaTypeClick={onMediaTypeClick}
          isFiltered={isFiltered}
          imageAmount={imageAmount}
          videoAmount={videoAmount}
        />
        <div className={cx('media-list')}>
          {hasMedia &&
            mediaList.map(
              ({ mediaId, mediaViewUrl, mediaHlsUrl, format, accessAuthority, eventName, organization, description, fileRotation }, index) => (
                <div
                  key={index}
                  className={cx('media-list-item')}
                  data-id={mediaId}
                  onClick={event => redirectToInfo(event, history, eventId, mediaList)}
                >
                  <MediaItem.Thumbnail
                    index={index}
                    mediaViewUrl={mediaViewUrl}
                    mediaHlsUrl={mediaHlsUrl}
                    accessAuthority={accessAuthority}
                    type={format}
                    currentTime={currentTime}
                    currentImageAngle={fileRotation}
                  />
                  <MediaItem.Info eventName={eventName} organization={organization} description={description} />
                </div>
              ),
            )}
          {!hasMedia && <EmptyData noDataText={isActivity ? '無任何媒體' : '無符合之媒體'} icon={<Icon.NoMedia />} />}
        </div>
        <ButtonLoadmore hasMore={hasMore} onLoadMoreClick={onLoadMoreClick} />
        {isEditMode && <div className={cx('media-cover')} />}
      </Panel>
      <Overlay isShowed={!isMediaListFetched} shouldCreatePortal={false} style={{ zIndex: 10, height: '100%' }}>
        <Spinner />
      </Overlay>
    </>
  )
}

MediaList.propTypes = propTypes

export default MediaList
