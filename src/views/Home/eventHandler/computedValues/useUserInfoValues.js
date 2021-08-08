import { useEffect } from 'react'
import { head, isEmpty, cloneDeep } from 'lodash'
import { useGlobalState } from '@/globalState/'
import { types as userTypes } from '@/globalState/reducers/user'
import { useSWRFetcher } from '@/effects/useSwrFetcher'
import userInfoUrl, { fetchUserInfo } from '@/api/fetchUserInfo'
import { useOrganizationOptions } from '@/views/Home/eventHandler/shareComputedValues/useOrganizationOptions'
import { getOrganizationWithOrganizationId } from '@/utils/getUserInfo'

export function useUserInfoValues() {
  const [state, dispatch] = useGlobalState()
  const { user, organization } = state
  const { userInfo } = user
  const { organizationList } = organization
  const employeeId = window.localStorage.getItem('userId')
  const { data, isFetched: isUserInfoFetched } = useSWRFetcher(
    {
      url: `${userInfoUrl}${employeeId}`,
      params: { employeeId },
    },
    fetchUserInfo,
  )

  const { organizationOptions } = useOrganizationOptions()

  useEffect(() => {
    if (!data || !organizationOptions || isEmpty(organizationList)) return

    // 如果第一次登入，將 current organization 存進 localstorage
    const hasCurrentOrganization = Boolean(window.localStorage.getItem('currentOrganization'))

    if (!hasCurrentOrganization) {
      const currentOrganization = head(data.organizations)

      const newOrganization = getOrganizationWithOrganizationId(currentOrganization, organizationOptions, organizationList)

      window.localStorage.setItem('currentOrganization', JSON.stringify(newOrganization))
    }

    if (!isEmpty(userInfo)) return

    const newData = {
      ...cloneDeep(data),
      organizations: data.organizations.map(item => {
        const newOrganization = getOrganizationWithOrganizationId(item, organizationOptions, organizationList)

        return newOrganization
      }),
    }

    dispatch({ type: userTypes.SET_USER_INFO, userInfo: newData })
  }, [dispatch, data, userInfo, organizationOptions, organizationList])

  return { isUserInfoFetched }
}
