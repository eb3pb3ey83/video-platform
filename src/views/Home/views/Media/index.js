// Libs
import React from 'react'
import { hot } from 'react-hot-loader/root'
import PropTypes from 'prop-types'

// Components
import navigations from './eventHandler/navigations'
import MediaForm from './components/MediaForm'
import MediaFormik from './components/MediaFormik'
import View from '@/basicComponents/View'

// Lib MISC
import { useMediaData } from './eventHandler/computedValues/useMediaData'

// PropTypes
export const propTypes = {
  location: PropTypes.object,
}

// DefaultProps
export const defaultProps = {}

function Media(props) {
  const { location } = props

  const { mediaData, isMediaListFetched, onSearchClick, onLoadMoreClick, onMediaTypeClick, isFiltered } = useMediaData(location)

  return (
    <>
      <View to='/home/media' navigations={navigations} {...props} />
      <MediaFormik onSearchClick={onSearchClick}>
        <MediaForm
          mediaData={mediaData}
          isMediaListFetched={isMediaListFetched}
          onLoadMoreClick={onLoadMoreClick}
          onMediaTypeClick={onMediaTypeClick}
          isFiltered={isFiltered}
        />
      </MediaFormik>
    </>
  )
}

Media.propTypes = propTypes
Media.defaultProps = defaultProps

export default hot(Media)
