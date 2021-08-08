import * as Yup from 'yup'
import createFileApiUrl, { createFile } from '@/api/createFile'
import { startRequest, setRequestSuccess, setRequestFailed } from '@/views/Home/eventHandler/shareMethods/useRequest'

const MAX_SIZE = 100 * 1024

const REG_TYPE = new RegExp(/^.*\.(xls|xlsx)/, 'i')

export default (props, dispatch) => {
  const { onClose, goActivity } = props

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      file: Yup.mixed()
        .required('未選擇任何檔案')
        .test('fileType', '不支援此檔案類型', value => value && REG_TYPE.test(value.name))
        .test('fileSize', '檔案大小過大', value => value && value.size <= MAX_SIZE),
    }),

    initialValues: {
      file: '',
    },

    onSubmit({ file }) {
      startRequest({ isShowAlert: true })

      createFile(createFileApiUrl, {
        file,
        organizationId: JSON.parse(window.localStorage.currentOrganization).organizationIdByTeam,
      })
        .then(response =>
          setRequestSuccess({
            isRevalidateEvents: true,
            onSuccess: goActivity,
          }),
        )
        .catch(error =>
          setRequestFailed(error, {
            alertTitle: '欄位資料不齊',
            onClose,
          }),
        )
    },
  }
}
