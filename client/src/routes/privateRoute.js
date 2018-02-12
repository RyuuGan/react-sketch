import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authService } from '../_services'

export const  PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    authService.authenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/auth/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
);
