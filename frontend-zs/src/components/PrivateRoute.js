import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services/authentication.service';

export const PrivateRoute = ({ component: Component }) => (
  <Route render={props => {
    const currentUser = authenticationService.currentUserValue;
    if (!currentUser) {
      return <Redirect to={{ pathname: '/login' }} />
    }
    return <Component/>
  }} />
);
