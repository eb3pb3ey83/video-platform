import { isEmpty, head } from 'lodash'
import { startFilter } from '@/utils/start-filter'

export function useRemainingTimeValue(uploadItems, uploadListState) {
  const isUploading = uploadListState === 'uploading'

  if (!isUploading) return

  const allItemRemainingTimes = uploadItems.map(item => Math.round(item.secondsRemaining)).filter(item => Boolean(item))

  if (isEmpty(allItemRemainingTimes)) return

  const longestTime = Math.max(...allItemRemainingTimes)
  const oneHourSeconds = 3600
  const oneMinuteSeconds = 60
  const remainingSeconds = longestTime % oneHourSeconds

  const handleHoursValue = () => {
    if (longestTime < oneHourSeconds) return

    const hours = Math.floor(longestTime / oneHourSeconds)

    return { hours }
  }

  const handleMinutesValue = () => {
    const remainingSeconds = longestTime % oneHourSeconds
    const minutes = Math.floor(remainingSeconds / oneMinuteSeconds)

    if (remainingSeconds < oneMinuteSeconds) return

    return { minutes }
  }

  const handleSecondsValue = () => {
    const seconds = remainingSeconds % oneMinuteSeconds

    if (seconds === 0) return

    return { seconds }
  }

  const getRemainingTime = startFilter(handleHoursValue)
    .next(handleMinutesValue)
    .end(handleSecondsValue)

  const getTimeWithUnit = (currentValue, time) => {
    const unit = head(Object.keys(time))
    const hasMinutes = currentValue.includes('minutes')

    // 如果剩餘時間有分鐘，就不回傳秒數
    if (hasMinutes) return currentValue

    return `${currentValue} ${time[unit]}${unit}`
  }

  const remainingTimeValue = getRemainingTime().reduce(getTimeWithUnit, '')

  return `剩餘 ${remainingTimeValue
    .replace('hours', ' 小時 ')
    .replace('minutes', ' 分 ')
    .replace('seconds', ' 秒')}
    `
}
