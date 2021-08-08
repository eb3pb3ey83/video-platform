import * as Yup from 'yup'
import activityUrl, { updateActivity } from '@/api/updateActivity'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export const initialFormikValues = {
  mediaType: '',
}

export default props => {
  const { initialValues, eventId, toggleEditMode } = props

  const currentOrganization = getCurrentOrganization()
  const { organizationIdByTeam } = currentOrganization

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      eventName: Yup.object().shape({
        year: Yup.number()
          .typeError('請填西元年份')
          .required('請填西元年份')
          .test('activityYear', '請填西元年份', value => String(value).length === 4),
        name: Yup.string().required('欄位請勿空白'),
      }),
      contact: Yup.string().max(30, '聯絡人字數勿超過30個字'),
      startDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
      endDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
    }),

    initialValues: {
      organizationId: organizationIdByTeam, // 修改時傳修改者的 organizationId
      eventName: initialValues?.eventName,
      startDate: initialValues?.startDate,
      endDate: initialValues?.endDate,
      place: initialValues?.place,
      contact: initialValues?.contact,
      imageAmount: initialValues?.imageAmount,
      videoAmount: initialValues?.videoAmount,
      ...initialFormikValues,
    },

    onSubmit(data) {
      startRequest({ isShowAlert: true })

      updateActivity(activityUrl, { eventId, ...data })
        .then(response =>
          setRequestSuccess({
            isRevalidateActivityInfo: true,
            isRevalidateEvents: true,
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
