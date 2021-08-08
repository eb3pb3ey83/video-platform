import * as Yup from 'yup'
import { getCurrentOrganization, getCurrentUserRole } from '@/utils/getUserInfo'

export default props => {
  const userRole = getCurrentUserRole()
  const { isHighestRole } = userRole

  const thisYear = new Date().getFullYear()

  const { departmentId } = getCurrentOrganization()

  return {
    enableReinitialize: true,

    validationSchema: Yup.object().shape({
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
      departmentId: isHighestRole ? 'all' : departmentId,
      startDate: `${thisYear}/01/01`,
      endDate: `${thisYear}/12/31`,
    },

    onSubmit(data) {},
  }
}
