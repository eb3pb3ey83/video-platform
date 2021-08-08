import mediaUrl, { deleteMedia } from '@/api/deleteMedia'
import { getCurrentOrganization } from '@/utils/getUserInfo'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'

export function onDeleteModalConfirm(history, attachmentId) {
  startRequest({ isShowAlert: true })

  const { organizationIdByTeam } = getCurrentOrganization()

  deleteMedia(`${mediaUrl}/${attachmentId}`, { organizationId: organizationIdByTeam })
    .then(response =>
      setRequestSuccess({
        isRevalidateMedia: true,
        onSuccess: history.goBack(),
      }),
    )
    .catch(error =>
      setRequestFailed(error, {
        alertTitle: '無法刪除媒體',
        errorMessage: '無法順利刪除媒體!',
      }),
    )
}
