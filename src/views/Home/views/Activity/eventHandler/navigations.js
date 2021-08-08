import Loadable from '@loadable/component'

const Import = Loadable(() => import('../views/Import'))
const ActivityCreator = Loadable(() => import('../views/ActivityCreator'))
const Info = Loadable(() => import('../views/Info'))

export default [
  {
    path: 'import',
    name: 'import',
    count: null,
    Component: Import,
  },
  {
    path: 'create',
    name: 'create',
    count: null,
    Component: ActivityCreator,
  },
  {
    path: ':eventId/info',
    name: 'info',
    count: null,
    Component: Info,
  },
]
