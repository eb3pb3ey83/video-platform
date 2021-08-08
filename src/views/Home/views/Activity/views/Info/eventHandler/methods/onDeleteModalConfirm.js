import activityUrl, { deleteActivity } from '@/api/deleteActivity'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export function onDeleteModalConfirm(history, eventId) {
  startRequest({ isShowAlert: true })

  const { organizationIdByTeam } = getCurrentOrganization()

  deleteActivity(`${activityUrl}/${eventId}`, { organizationId: organizationIdByTeam })
    .then(response =>
      setRequestSuccess({
        isRevalidateEvents: true,
        onSuccess: history.push('/home/activity'),
      }),
    )
    .catch(error =>
      setRequestFailed(error, {
        alertTitle: '刪除單筆活動錯誤',
        errorMessage: '活動刪除失敗，請重新再試',
      }),
    )
}
