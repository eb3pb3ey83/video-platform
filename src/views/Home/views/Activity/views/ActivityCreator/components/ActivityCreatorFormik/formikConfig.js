import * as Yup from 'yup'
import { cloneDeep } from 'lodash'
import activityUrl, { createActivity } from '@/api/createActivity'
import { getCurrentOrganization } from '@/utils/getUserInfo'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'

export default (props, dispatch) => {
  const { goActivity } = props
  const { organizationIdByTeam } = getCurrentOrganization()
  const thisYear = String(new Date().getFullYear())

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      activityYear: Yup.number()
        .typeError('請填西元年份')
        .required('請填西元年份')
        .test('activityYear', '請填西元年份', value => String(value).length === 4),
      activityName: Yup.string().required('欄位請勿空白'),
      activityStartDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
      activityEndDate: Yup.string().test(
        'dataValid',
        '請輸入完整之西元年月日',
        value => value && value.match(/^[1-9][0-9]{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/),
      ),
    }),

    initialValues: {
      organizationId: organizationIdByTeam,
      activityStartDate: `${thisYear}/01/01`,
      activityEndDate: `${thisYear}/12/31`,
      activityYear: thisYear,
      activityName: '',
      placeId: '',
      activityContact: '',
    },

    onSubmit(data) {
      const submitData = cloneDeep(data)

      startRequest({ isShowAlert: true })

      createActivity(activityUrl, { data: submitData })
        .then(response =>
          setRequestSuccess({
            isRevalidateEvents: true,
            onSuccess: goActivity,
          }),
        )
        .catch(error => {
          const isDuplicateName = error.error?.response?.data?.eventName === 'Duplicate event name'

          setRequestFailed(error, {
            alertTitle: '新增單筆活動錯誤',
            errorMessage: isDuplicateName ? '該活動已存在' : error.message,
          })
        })
    },
  }
}
