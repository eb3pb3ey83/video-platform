import { useEffect, useMemo } from 'react'
import { useGlobalState } from '@/globalState'
import { isEmpty, head } from 'lodash'

export function useOrganizationOptions(values, setFieldValue) {
  const [state] = useGlobalState()
  const { organization } = state
  const { organizationList } = organization

  const organizationOptions = useMemo(
    () =>
      values.applicant.organization?.map(item => ({
        label: `${item.deptName} ${item.teamName}`,
        value: organizationList.find(organizationItem => {
          const isTeamEmpty = isEmpty(item.teamId)

          if (isTeamEmpty) return organizationItem.departmentId === item.deptId

          return organizationItem.departmentId === item.deptId && organizationItem.teamId === item.teamId
        }).organizationId,
      })),
    [values.applicant.organization, organizationList],
  )

  useEffect(() => {
    setFieldValue('organizationId', head(organizationOptions)?.value ?? 0)
  }, [organizationOptions, setFieldValue])

  useEffect(() => {
    if (!isEmpty(values.applicant)) return

    setFieldValue('organizationId', '')
  }, [values.applicant, setFieldValue])

  return organizationOptions
}
