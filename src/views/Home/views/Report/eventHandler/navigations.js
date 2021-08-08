import Loadable from '@loadable/component'
import FEATURE from '@/constants/FEATURE'

const Upload = Loadable(() => import('../views/Upload'))
const View = Loadable(() => import('../views/View'))
const Download = Loadable(() => import('../views/Download'))

export default [
  {
    path: 'upload',
    name: '媒體上傳數量',
    count: null,
    Component: Upload,
    feature: [FEATURE.REPORT_UPLOAD],
  },
  {
    path: 'view',
    name: '瀏覽次數',
    count: null,
    Component: View,
    feature: [FEATURE.REPORT_VIEW],
  },
  {
    path: 'download',
    name: '下載次數',
    count: null,
    Component: Download,
    feature: [FEATURE.REPORT_DOWLOAD],
  },
]
