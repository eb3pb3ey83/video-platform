import { exportFile } from '@/utils/downloadFile'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'
import downloadApiUrl, { downloadMediaFile } from '@/api/downloadMedia'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export function onDownloadClick(downloadData) {
  const { attachmentId } = downloadData

  const currentOrganization = getCurrentOrganization()
  const { organizationIdByTeam } = currentOrganization

  startRequest({ isShowAlert: true })

  downloadMediaFile(downloadApiUrl, { attachmentId, organizationId: organizationIdByTeam })
    .then(fileUrl => {
      setRequestSuccess()
      exportFile(fileUrl)
    })
    .catch(error =>
      setRequestFailed(error, {
        alertTitle: '下載失敗，請再試一次',
      }),
    )
}
