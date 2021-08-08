import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

// Lib MISC
import findStaticPath from '@/utils/find-static-path'

// Variables / Functions

export const propTypes = {
  to: PropTypes.string,
  match: PropTypes.object,
  componentProps: PropTypes.object,
  navigations: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
      name: PropTypes.string,
      icon: PropTypes.shape({
        mode: PropTypes.string,
        name: PropTypes.string,
      }),
      count: PropTypes.number,
    }),
  ).isRequired,
}

function View(props) {
  const { navigations, match, to: propsTo, componentProps } = props
  const to = propsTo || `${match.url}/${findStaticPath(navigations[0].path)}`

  return (
    <Switch>
      {navigations.map(({ path, Component }, index) => (
        <Route
          key={index}
          strict
          sensitive
          path={Array.isArray(path) ? path.map(p => `${match.url}/${p}`) : `${match.url}/${path}`}
          render={props => <Component {...componentProps} {...props} />}
        />
      ))}
      <Redirect replace from={match.url} to={to} />
    </Switch>
  )
}

View.propTypes = propTypes

export default View
