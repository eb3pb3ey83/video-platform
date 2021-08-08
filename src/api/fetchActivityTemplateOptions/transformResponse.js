import { format } from 'date-fns'

export default activityTempleteOptions => {
  const newActivityTempleteOptions = activityTempleteOptions.map(option => {
    return {
      label: option.eventName.name,
      value: option.eventName.name,
      templateYear: option.eventName.year,
      templateStartDate: format(new Date(option.startDate), 'yyyy/MM/dd'),
      templateEndDate: format(new Date(option.endDate), 'yyyy/MM/dd'),
      templateContact: option.contact,
      templatePlaceId: option.place?.placeId || '',
      templatePlaceName: option.place?.placeNameCh || '',
    }
  })

  return newActivityTempleteOptions
}
