import { isEmpty } from 'lodash'
import activityInfoUrl, { fetchActivityInfo } from '@/api/fetchActivityInfo'

export function getEventName({ checkedResult, errors, setErrors, setFieldValue, setFieldError, setFieldTouched, id, index }) {
  if (checkedResult === 'eventNameDuplicated') return

  if (isEmpty(id)) return

  setFieldTouched(`eventId.${index}.id`, true)

  fetchActivityInfo(`${activityInfoUrl}${id}`)
    .then(response => {
      if (errors.eventId) {
        setErrors({
          ...errors,
          eventId: errors.eventId.map((item, itemIndex) => (itemIndex === index ? null : item)),
        })
      }

      setFieldValue(`eventId.${index}.name`, response.viewData.eventName)
    })
    .catch(() => {
      setFieldError(`eventId.${index}.id`, '活動名稱不存在')
      setFieldValue(`eventId.${index}.name`, '')
    })
}
