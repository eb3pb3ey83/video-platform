import { format } from 'date-fns'
import { isNull } from 'lodash'

export default ({
  eventName,
  startDate,
  endDate,
  place,
  contact,
  organization,
  createdUser,
  updatedUser,
  updatedTime,
  imageAmount,
  videoAmount,
}) => ({
  viewData: {
    eventName: `${eventName.year}年 ${eventName.name}`,
    period: `${format(new Date(startDate), 'yyyy/MM/dd')} 至 ${format(new Date(endDate), 'yyyy/MM/dd')}`,
    place: place?.placeNameCh,
    placeId: place?.placeId,
    deptName: organization?.deptName,
    createdUser: !createdUser && !createdUser ? '無編輯者' : `${createdUser.empName} [員編：${createdUser.empId}]`,
    updatedUser: !updatedUser && !updatedUser ? '無編輯者' : `${updatedUser.empName} [員編：${updatedUser.empId}]`,
    updatedTime: format(new Date(updatedTime), 'yyyy/MM/dd'),
    createdUserName: createdUser?.empName,
    contact,
    imageAmount,
    videoAmount,
  },
  editData: {
    organizationId: organization?.orgId,
    eventName: { year: eventName.year, name: eventName.name },
    startDate: format(new Date(startDate), 'yyyy/MM/dd'),
    endDate: format(new Date(endDate), 'yyyy/MM/dd'),
    place: place?.placeId,
    contact: isNull(contact) ? '' : contact,
    imageAmount,
    videoAmount,
  },
})
