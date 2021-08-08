import React from 'react'
import Icon from '@/basicComponents/Icon'
import Loadable from '@loadable/component'
import FEATURE from '@/constants/FEATURE'

const Media = Loadable(() => import('../views/Media'))
const Activity = Loadable(() => import('../views/Activity'))
const Report = Loadable(() => import('../views/Report'))
const Management = Loadable(() => import('../views/Management'))

export default [
  {
    path: 'media',
    name: '影音資料庫-照片及影片',
    icon: <Icon.Media role='menu-icon' />,
    hasNotification: false,
    Component: Media,
    feature: [FEATURE.MEDIA],
  },
  {
    path: 'activity',
    name: '活動列表',
    icon: <Icon.Activity role='menu-icon' />,
    hasNotification: false,
    Component: Activity,
    feature: [FEATURE.ACTIVITY],
  },
  {
    path: 'report',
    name: '統計報表',
    icon: <Icon.Report role='menu-icon' />,
    hasNotification: false,
    Component: Report,
    feature: [FEATURE.REPORT_UPLOAD, FEATURE.REPORT_DOWLOAD, FEATURE.REPORT_VIEW],
  },
  {
    path: 'management',
    name: '管理中心',
    icon: <Icon.Management role='menu-icon' />,
    hasNotification: false,
    Component: Management,
    feature: [FEATURE.MANAGEMENT_RECORD, FEATURE.MANAGEMENT_APPLICATION_RECORD, FEATURE.MANAGEMENT_MAINTENANCE],
  },
]
