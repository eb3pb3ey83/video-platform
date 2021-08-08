// Libs
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import classnames from 'classnames/bind'
import styles from './style.module.scss'
import { canVideoPlay } from '@/utils/can-video-play'
import { useVideoWatermark } from './eventHandler/methods/useVideoWatermark'

// Components

// Variables / Functions
const cx = classnames.bind(styles)

// PropTypes
export const propTypes = {
  id: PropTypes.string.isRequired,
  sources: PropTypes.array.isRequired,
  customSetting: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string,
  currentMediaId: PropTypes.number,
  isUploading: PropTypes.bool,
}

// DefaultProps
export const defaultProps = {
  poster: '',
  type: '',
  isUploading: false,
}

function Video(props) {
  const { customSetting, id, className, sources, type, currentMediaId, isUploading } = props
  const [mediaPlayer, setMediaPlayer] = useState({})
  const playerRef = useRef(null)

  useVideoWatermark(mediaPlayer, currentMediaId)

  // 由於活動內層的 mediaPlayer 未卸載，所以要給不一樣的 id
  const videoId = isUploading ? `${id}-upload` : id

  useEffect(() => {
    if (!isEmpty(mediaPlayer)) return

    // 目前只提供 .mp4 跟 .mov 播放，.mov 的 type 一樣給 'video/mp4'
    const player = videojs(videoId, {
      sources: sources.map(item => {
        // 上傳時 video.js 只接受 .mp4, .mov 檔
        // 播放時以 AWS 能轉檔為主，基本上認的到 fileType 為 video 都能播
        return { ...item, type: canVideoPlay(type) && isUploading ? 'video/mp4' : '' }
      }),
      poster: '',
      preload: 'auto',
      muted: true,
      controls: true, // true 時可以 play or pause
      textTrackSettings: false,
      textTrackDisplay: false,
      errorDisplay: false,
      loadingSpinner: false,
      controlBar: false,
      ...customSetting,
    })

    setMediaPlayer(player)

    player.on('play', function() {})
  }, [customSetting, isUploading, mediaPlayer, sources, type, videoId])

  useEffect(() => {
    return () => {
      if (isEmpty(mediaPlayer)) return

      mediaPlayer.dispose()
    }
  }, [mediaPlayer])

  return <video id={videoId} className={cx('video-js vjs-default-skin vjs-big-play-centered', className)} ref={playerRef} />
}

Video.propTypes = propTypes
Video.defaultProps = defaultProps

export default Video
