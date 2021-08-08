import { isEmpty } from 'lodash'

export function checkEventName({ values, setFieldValue, setFieldError, setFieldTouched, id, index }) {
  setFieldTouched(`eventId.${index}.id`, true)

  if (isEmpty(id)) {
    return setFieldValue(`eventId.${index}.name`, '')
  }

  const isEventNameDuplicated = values.eventId.filter(item => item.id === id).length > 1

  if (isEventNameDuplicated) {
    setFieldError(`eventId.${index}.id`, '活動編號已重複')
    setFieldValue(`eventId.${index}.name`, '')

    return 'eventNameDuplicated'
  }
}
