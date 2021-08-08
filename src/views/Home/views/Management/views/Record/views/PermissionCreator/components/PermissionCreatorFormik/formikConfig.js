import * as Yup from 'yup'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'
import addDays from 'date-fns/addDays'
import downloadPermissionUrl, { createDownloadPermission } from '@/api/createDownloadPermission'
import activityInfoUrl, { fetchActivityInfo } from '@/api/fetchActivityInfo'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'

export default (props, dispatch) => {
  return {
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,

    validationSchema: Yup.object().shape({
      applicant: Yup.object().test('isEmpty', '*欄位請勿空白', value => !isEmpty(value)),
      organizationId: Yup.number().min(1, '*欄位請勿空白'),
      eventId: Yup.array().of(
        Yup.object().shape({
          id: Yup.string()
            .required('*欄位請勿空白')
            .test('checkActivityId', '活動名稱不存在', id => {
              if (isEmpty(id)) return

              return new Promise((resolve, reject) => {
                fetchActivityInfo(`${activityInfoUrl}${id}`)
                  .then(resolve)
                  .catch(() => reject(new Error('活動名稱不存在')))
              }).catch(error => console.log(error))
            }),
        }),
      ),
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
      applicant: {},
      organizationId: 0,
      startDate: format(new Date(), 'yyyy/MM/dd'),
      endDate: format(addDays(new Date(), 14), 'yyyy/MM/dd'),
      eventId: [{ id: '', name: '' }],
    },

    onSubmit(data) {
      const { goRecord } = props

      startRequest({ isShowAlert: true })

      createDownloadPermission(downloadPermissionUrl, data)
        .then(() => {
          setRequestSuccess({
            isRevalidateRecords: true,
            onSuccess: goRecord,
          })
        })
        .catch(error => {
          setRequestFailed(error, {
            alertTitle: '新增單筆活動錯誤',
            errorMessage: error.message,
          })
        })
    },
  }
}
