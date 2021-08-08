import * as Yup from 'yup'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'

const thisYear = new Date().getFullYear()
const PROJECT_NO_LENGTH = 7

export const initialFormikValues = {
  startDate: `${thisYear}/01/01`,
  endDate: `${thisYear}/12/31`,
  eventName: [],
  keyword: [],
  fileNo: '',
  mediaType: '',
  accessAuthority: ACCESS_AUTHORITY.PUBLIC,
  placeId: 'all',
  organizationId: 'all',
  projectNo: '',
}

export default props => {
  const { onSearchClick } = props

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
      projectNo: Yup.mixed()
        .typeError('欄位格式不符')
        .test('projectNo', '欄位格式不符', value => {
          const regex = /^[A-Za-z0-9]+$/ // 只能有大小寫英文字母及數字

          return !value || (value.match(regex) && value.length === PROJECT_NO_LENGTH)
        }),
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

    initialValues: initialFormikValues,

    onSubmit(data) {
      onSearchClick({ ...data })
    },
  }
}
