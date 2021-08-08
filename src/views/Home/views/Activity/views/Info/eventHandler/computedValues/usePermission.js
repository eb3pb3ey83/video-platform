import { useGlobalState } from '@/globalState'
import { ROLE } from '@/constants/ROLE'
import { getCurrentOrganization, getCurrentUserRole } from '@/utils/getUserInfo'

export function usePermission(activityInfo = {}) {
  const [state] = useGlobalState()
  const { user } = state
  const { userInfo } = user
  const userRole = getCurrentUserRole()
  const { name: roleName } = userRole
  const { deptName, createdUserName } = activityInfo
  const isDeptRootUser = roleName === ROLE.SEED

  const currentOrganization = getCurrentOrganization()
  const isBelongMyDept = currentOrganization.departmentName === deptName

  const isEmptyDept = !deptName

  const isCreatedByMe = userInfo.employeeName === createdUserName

  const isShowEditButton = Boolean([userRole.isHighestRole, isDeptRootUser && isBelongMyDept, isCreatedByMe].find(condition => condition))

  const isShowContact = userRole.isHighestRole

  const isShowRemoveButton = userRole.isHighestRole

  const isShowUploadButton = !isEmptyDept

  return { isShowEditButton, isShowContact, isShowRemoveButton, isShowUploadButton }
}
