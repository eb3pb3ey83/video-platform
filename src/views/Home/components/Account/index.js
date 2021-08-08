import React, { useState } from 'react'
import PropTypes from 'prop-types'
import authConfig from '@/authConfig'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames/bind'
import { useGlobalState } from '@/globalState/'
import { isEmpty } from 'lodash'

// Components
import Icon from '@/basicComponents/Icon'
import Popover from '@/basicComponents/Popover'
import List from '@/basicComponents/List'
import Typography from '@/basicComponents/Typography'
import Tag from '@/basicComponents/Tag'

// Lib MISC
import withLoading from '@/hocs/withLoading'
import { getUserName, getDepartmentNameWithTeamName, getNameWithJobDescriptionAndId, getCurrentOrganization } from '@/utils/getUserInfo'

// Modules

// Style
import styles from './style.module.scss'
import { PLACEMENTS } from '@/utils/dom-align'

// Variables / Functions
const cx = classnames.bind(styles)
const ListWithLoading = withLoading(List)

export const propTypes = {
  history: PropTypes.object,
}

function Account(props) {
  const { history } = props
  const [isPopoverOpened, setIsPopoverOpened] = useState(false)

  const [state] = useGlobalState()

  const { user } = state
  const { userInfo } = user

  const currentOrganization = JSON.parse(window.localStorage.getItem('currentOrganization'))

  const onLogoutClick = event => {
    setIsPopoverOpened(false)
    authConfig.logOut()
  }

  const onOrgazitionClick = organization => {
    const currentOrganization = getCurrentOrganization()

    const isSelectedSameOrganization =
      organization?.departmentId === currentOrganization?.departmentId &&
      organization?.teamId === currentOrganization?.teamId &&
      organization?.organizationIdByTeam === currentOrganization?.organizationIdByTeam

    // 如果選到一樣的 organization 就不做動作
    if (isSelectedSameOrganization) return

    window.localStorage.setItem('currentOrganization', JSON.stringify(organization))
    setIsPopoverOpened(false)

    history.push('/')
  }

  return (
    <Popover
      // translateX = (Account 寬度 (270px) - 總寬度 (326px) / 2) - margin-right (10px)
      // FIXME 這不是好辦法⋯⋯
      from={{ visibility: 'hidden', transform: `translate3d(${screen.width <= 768 ? '60px' : '-38px'}, -40px, 0px)` }}
      to={{
        zIndex: 1,
        // FIXME 這不是好辦法⋯⋯
        transform: `translate3d(${screen.width <= 768 ? '60px' : '-38px'}, 0px, 0px)`,
        // 點擊內容，關掉 popover 的時候，因為重新 render 會導致動畫重跑，所以設透明度讓 popover 看起來是直接消失
        opacity: isPopoverOpened ? 1 : 0,
        visibility: 'visible',
      }}
      placement={PLACEMENTS.BOTTOM}
      style={{ width: 326 }}
      padding='0 16px'
      isOpened={isPopoverOpened}
      onOuterAction={event => setIsPopoverOpened(false)}
      content={
        <ListWithLoading
          isLoaded={!isEmpty(userInfo)}
          isFetching={isEmpty(userInfo)}
          render={() => (
            <>
              {userInfo.organizations.map((organization, index) => {
                const isCurrent = currentOrganization.departmentId === organization.departmentId && currentOrganization.teamId === organization.teamId

                return (
                  <List.Item
                    key={index}
                    isSelectable
                    prefix={<Tag>我的</Tag>}
                    prefixAlign='flex-start'
                    suffix={isCurrent && <Icon.Check />}
                    suffixColor='gray-dark'
                    onClick={() => onOrgazitionClick(organization)}
                  >
                    <List.Item.Meta
                      title={getNameWithJobDescriptionAndId(userInfo)}
                      description={getDepartmentNameWithTeamName(organization)}
                      role={organization?.role}
                    />
                  </List.Item>
                )
              })}
              {userInfo.organizations.length > 0 && <Typography.Hr marginTop={10} marginBottom={10} />}
              <List.Item padding='15px 0' isSelectable onClick={onLogoutClick} className={cx('log-out-web')}>
                <Typography.Text prefix={<Icon.Logout />} prefixColor='gray-dark'>
                  登出
                </Typography.Text>
              </List.Item>
            </>
          )}
        />
      }
    >
      <ListWithLoading
        className={cx('home-account')}
        withPadding={false}
        isLoaded={!isEmpty(userInfo)}
        isFetching={isEmpty(userInfo)}
        onClick={event => setIsPopoverOpened(true)}
        render={() => (
          <div>
            <List.Item
              isSelectable
              padding='16px 19px 16px 24px'
              prefix={<Icon.Avator />}
              suffix={isPopoverOpened ? <Icon.ChevronUp role='account-icon' /> : <Icon.ChevronDown role='account-icon' />}
            >
              <List.Item.Info
                title={getUserName(userInfo)}
                description={getDepartmentNameWithTeamName(getCurrentOrganization())}
                descriptionProps={{ color: 'inherit', fontWeight: 300 }}
                role={currentOrganization?.role}
              />
            </List.Item>
          </div>
        )}
      />
    </Popover>
  )
}

Account.propTypes = propTypes
export default withRouter(Account)
