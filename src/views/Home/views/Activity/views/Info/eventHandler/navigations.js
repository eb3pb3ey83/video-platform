import Loadable from '@loadable/component'

const Upload = Loadable(() => import('../views/Upload'))

export default [
  {
    path: 'upload',
    name: 'upload',
    count: null,
    Component: Upload,
  },
]
