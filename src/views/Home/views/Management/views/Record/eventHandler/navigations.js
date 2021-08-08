import Loadable from '@loadable/component'

const PermissionCreator = Loadable(() => import('../views/PermissionCreator'))

export default [
  {
    path: 'permissionCreator',
    name: 'permissionCreator',
    count: null,
    Component: PermissionCreator,
  },
]
