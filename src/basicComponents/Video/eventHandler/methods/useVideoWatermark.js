import { useState, useEffect, useRef, useCallback } from 'react'
import { isEmpty } from 'lodash'

export function useVideoWatermark(mediaPlayer, currentMediaId) {
  const [currentWatermark, setCurrentWatermark] = useState(null)
  const isFirstRef = useRef(true)

  // 因為 watermark 蓋在 video 上面，所以把點擊播放和暫停功能做在 watermark 上
  const onWatermarkClick = useCallback(() => {
    const isPlayerPaused = mediaPlayer.paused()

    if (isPlayerPaused) {
      mediaPlayer.play()
    } else {
      mediaPlayer.pause()
    }
  }, [mediaPlayer])

  useEffect(() => {
    if (isEmpty(mediaPlayer) || isFirstRef.current) {
      isFirstRef.current = false
    } else {
      const newWatermark = document.getElementById(`watermark-${currentMediaId}`)

      setCurrentWatermark(newWatermark)
    }
  }, [currentMediaId, isFirstRef, mediaPlayer])

  useEffect(() => {
    if (currentWatermark) {
      currentWatermark.addEventListener('click', onWatermarkClick)
    }

    return () => {
      if (currentWatermark) currentWatermark.removeEventListener('click', onWatermarkClick)
    }
  }, [currentWatermark, onWatermarkClick])
}
