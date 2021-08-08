import Loadable from '@loadable/component'

const Info = Loadable(() => import('../views/Info'))

export default [
  {
    path: ':mediaId/info',
    name: 'info',
    count: null,
    Component: Info,
  },
]
