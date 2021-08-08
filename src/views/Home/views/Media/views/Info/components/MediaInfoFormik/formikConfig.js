import * as Yup from 'yup'
import { removeObjectEmptyValue } from '@/utils/remove-object-empty-value'
import mediaFileUrl, { updateMediaFile } from '@/api/updateMediaFile'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'
import { getCurrentOrganization } from '@/utils/getUserInfo'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

export default props => {
  const { initialValues, toggleEditMode } = props
  const PROJECT_NO_LENGTH = 7

  const currentOrganization = getCurrentOrganization()
  const { organizationIdByTeam } = currentOrganization

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      description: Yup.string().required('請輸入圖說描述'),
      projectNo: Yup.mixed()
        .typeError('欄位格式不符')
        .test('projectNo', '欄位格式不符', value => {
          const regex = /^[A-Za-z0-9]+$/ // 只能有大小寫英文字母及數字

          return !value || (value.match(regex) && value.length === PROJECT_NO_LENGTH)
        }),
      fileReason: Yup.string().when('accessAuthority', {
        is: value => value === String(ACCESS_AUTHORITY.ALL),
        then: Yup.string().required('請輸入不公開理由'),
      }),
    }),

    initialValues: {
      attachmentId: initialValues?.attachmentId,
      organizationId: organizationIdByTeam, // 修改時傳修改者的 organizationId
      accessAuthority: initialValues?.accessAuthority,
      description: initialValues?.description,
      projectNo: initialValues?.projectNo,
      leader: initialValues?.leader,
      keywords: initialValues?.keywords,
      language: initialValues?.language,
      place: initialValues?.place,
      customizekeywords: initialValues?.customizekeywords,
      fileRotation: initialValues?.fileRotation,
      fileReason: initialValues?.fileReason,
    },

    onSubmit(data) {
      startRequest({ isShowAlert: true })

      updateMediaFile(mediaFileUrl, removeObjectEmptyValue(data))
        .then(response =>
          setRequestSuccess({
            isRevalidateMediaInfo: true,
            onSuccess: toggleEditMode,
          }),
        )
        .catch(error =>
          setRequestFailed(error, {
            alertTitle: '更新失敗，請再試一次',
          }),
        )
    },
  }
}
