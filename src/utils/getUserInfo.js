import isPlainObject from 'lodash/isPlainObject'
import { find } from 'lodash'

// Example: '員編：1986'
export const getId = user => `[員編：${user.employeeId}]`

// Example: '行政業務處・事務組'
export const getDepartmentNameWithTeamName = organization =>
  isPlainObject(organization) ? `${organization.departmentName}${organization.teamName.length > 0 ? `・${organization.teamName}` : ''}` : ''

// Example: '蔡宗德'
export const getUserName = user => `${user.employeeName}`

// Example: '蔡宗德 (專員)'
export const getNameWithJobDescription = user => `${user.employeeName}${user.jobDescription.length > 0 ? ` (${user.jobDescription})` : ''}`

export const getNameWithJobDescriptionAndId = user => `${getNameWithJobDescription(user)} ${getId(user)}`

export const getCurrentOrganization = () => {
  const currentOrganization = JSON.parse(window.localStorage.getItem('currentOrganization'))

  return currentOrganization
}

export const getOrganizationWithOrganizationId = (organization, organizationOptions, organizationList) => {
  // 後端其他 API 需要 organizationId，但 fetchUserInfo 後端無法給 organizationId
  // 只能前端自己從 organizationOptions 跟 organizationList mapping
  // 整個 department 的 organizationId 為 organizationIdByDepartment
  // 整個 department 裡特定 team 的 organizationId 為 organizationIdByTeam
  const { departmentId, teamId } = organization

  // 取得 organizationIdByDepartment
  const currentUserOrganizationFromOptions = find(organizationOptions, { departmentId })

  // 取得 organizationIdByTeam
  const currentUserOrganizationFromList = find(organizationList, { departmentId, teamId: teamId || '' })

  // 取得 user 該 organization 的 角色
  const userRoleName = organization?.role?.roleName

  const isHighestRole = userRoleName === '最高權限管理者'

  const newCurrentUserRole = {
    name: userRoleName,
    isHighestRole,
  }

  const newOrganization = {
    ...organization,
    organizationIdByDepartment: currentUserOrganizationFromOptions?.value,
    organizationIdByTeam: currentUserOrganizationFromList?.organizationId,
    role: newCurrentUserRole,
  }

  // 為了方便除錯，如果沒有 mapping 到資料就印 console
  if (!currentUserOrganizationFromOptions || !currentUserOrganizationFromList) console.log('組織有誤不符合')

  return newOrganization
}

export const getCurrentUserRole = () => {
  const currentUserRole = JSON.parse(window.localStorage.getItem('currentOrganization')).role

  return currentUserRole
}
