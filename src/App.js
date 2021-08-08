import React from 'react'
import { useGlobalReducer, GlobalReducerContext } from './globalState'
import { hot } from 'react-hot-loader'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import authConfig from '@/authConfig'

// Components / views
import Home from '@/views/Home'
import Auth from '@/views/Auth'

function App() {
  const isAuthorized = authConfig.getAccessToken()

  return (
    <>
      <GlobalReducerContext.Provider value={useGlobalReducer()}>
        {isAuthorized ? (
          <Switch>
            <Route strict sensitive path='/home' component={Home} />
            <Redirect push from='/' to='/home' />
          </Switch>
        ) : (
          <Switch>
            <Route strict sensitive path='/auth' component={Auth} />
            <Redirect push from='/' to='/auth' />
          </Switch>
        )}
      </GlobalReducerContext.Provider>
    </>
  )
}

export default hot(module)(withRouter(App))
