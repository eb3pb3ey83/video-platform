import Loadable from '@loadable/component'
import FEATURE from '@/constants/FEATURE'

const ApplicationRecord = Loadable(() => import('../views/ApplicationRecord'))
const Record = Loadable(() => import('../views/Record'))
const Maintenance = Loadable(() => import('../views/Maintenance'))

export default [
  {
    path: 'applicationRecord',
    name: '申請紀錄',
    count: null,
    Component: ApplicationRecord,
    feature: [FEATURE.MANAGEMENT_APPLICATION_RECORD],
  },
  {
    path: 'record',
    name: '受理申請紀錄',
    count: null,
    Component: Record,
    feature: [FEATURE.MANAGEMENT_RECORD],
  },
  {
    path: 'maintenance',
    name: '系統維護',
    count: null,
    Component: Maintenance,
    feature: [FEATURE.MANAGEMENT_MAINTENANCE],
  },
]
