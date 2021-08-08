import * as Yup from 'yup'
import { format } from 'date-fns'
import { cloneDeep } from 'lodash'
import activityUrl, { createActivity } from '@/api/createActivity'
import { getCurrentOrganization } from '@/utils/getUserInfo'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'

export default (props, dispatch) => {
  const { goActivity } = props
  const { organizationIdByTeam } = getCurrentOrganization()
  const thisYear = new Date().getFullYear()

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      activityYear: Yup.number()
        .typeError('請填西元年份')
        .required('請填西元年份')
        .test('activityYear', '請填西元年份', value => String(value).length === 4),
      activityName: Yup.string().required('欄位請勿空白'),
    }),

    initialValues: {
      organizationId: organizationIdByTeam,
      activityStartDate: format(new Date(), 'yyyy/MM/dd'),
      activityEndDate: format(new Date(), 'yyyy/MM/dd'),
      activityYear: thisYear,
      activityName: '',
      placeId: '',
      activityContact: '',
      test: [],
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
        .catch(error =>
          setRequestFailed(error, {
            alertTitle: '新增單筆活動錯誤',
          }),
        )
    },
  }
}
