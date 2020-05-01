import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authentication.service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route render={props => {
    const currentUser = authenticationService.currentUserValue;
    if (!currentUser) return <Redirect to={{ pathname: '/login' }} />
    if (!currentUser.registrationComplete
      && props.location.pathname !== '/registrationStepTwo') {
      return <Redirect to={{ pathname: '/registrationStepTwo' }} />
    }
    if (currentUser.registrationComplete && props.location.pathname === '/registrationStepTwo') {
      return <Redirect to={{ pathname: '/stories' }} />
    }
    return <Component {...props} {...rest} />
  }} />
);
