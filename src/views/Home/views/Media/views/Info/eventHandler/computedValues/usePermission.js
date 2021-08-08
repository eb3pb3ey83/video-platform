import { useGlobalState } from '@/globalState'
import { ROLE } from '@/constants/ROLE'
import { ACCESS_AUTHORITY } from '@/constants/ACCESS_AUTHORITY'
import { getCurrentOrganization, getCurrentUserRole } from '@/utils/getUserInfo'

export function usePermission(mediaInfo = {}) {
  const [state] = useGlobalState()
  const { user } = state
  const { userInfo } = user
  const userRole = getCurrentUserRole()
  const { name: roleName, isHighestRole } = userRole
  const { deptName, eventCreatedUserId, mediaCreatedUserId, accessAuthority, downloadAuthority } = mediaInfo
  const isNormalUser = roleName === ROLE.NORMAL
  const isDepartmentRootUser = roleName === ROLE.SEED

  const currentOrganization = getCurrentOrganization()

  const isBelongMyDepartment = currentOrganization.departmentName === deptName

  const isEventCreatedByMe = userInfo.employeeId === eventCreatedUserId

  const isMediaCreatedByMe = userInfo.employeeId === mediaCreatedUserId

  const isPrivate = accessAuthority === ACCESS_AUTHORITY.ALL && !isHighestRole && !downloadAuthority

  const isShowDownloadButton = true // all

  const isShowEditButton =
    isHighestRole || (isDepartmentRootUser && isBelongMyDepartment) || (isNormalUser && isMediaCreatedByMe) || (isNormalUser && isEventCreatedByMe) // 最高權限 或 隸屬於改處室種子代表 或 上傳影音者 或 活動建立者

  const isShowRemoveButton =
    isHighestRole || (isDepartmentRootUser && isBelongMyDepartment) || (isNormalUser && isMediaCreatedByMe) || (isNormalUser && isEventCreatedByMe) // 最高權限 或 隸屬於改處室種子代表 或 上傳影音者 或 活動建立者

  const isDisabledDownloadButton = isPrivate // 非公開檔案

  const isDisabledEditButton = isDepartmentRootUser && !isBelongMyDepartment // 非公開檔案 且 各處室種子代表不屬於該種子處下

  const isDisabledRemoveButton = isDepartmentRootUser && !isBelongMyDepartment // 各處室種子代表不屬於該種子處下

  const canEditAuthorityByAll = accessAuthority === ACCESS_AUTHORITY.PUBLIC || isHighestRole || isMediaCreatedByMe

  return {
    isShowDownloadButton,
    isShowEditButton,
    isShowRemoveButton,
    isDisabledDownloadButton,
    isDisabledEditButton,
    isDisabledRemoveButton,
    canEditAuthorityByAll,
  }
}
