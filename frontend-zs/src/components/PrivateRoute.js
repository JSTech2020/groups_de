import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authentication.service';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) return <Redirect to={{ pathname: '/login' }} />
      if (!currentUser.registrationComplete) return <Redirect to={{ pathname: '/registrationStepTwo' }} />
      return <Component />
    }} />
);
