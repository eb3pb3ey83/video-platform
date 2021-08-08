import * as Yup from 'yup'
import { getCurrentOrganization } from '@/utils/getUserInfo'

export default props => {
  const thisYear = new Date().getFullYear()

  const { organizationIdByDepartment } = getCurrentOrganization()

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
      organizationId: organizationIdByDepartment,
      placeId: 'all',
      eventId: '',
      startDate: `${thisYear}/01/01`,
      endDate: `${thisYear}/12/31`,
      isDescending: true,
      sortBy: 'start_date',
    },

    onSubmit(data) {},
  }
}
