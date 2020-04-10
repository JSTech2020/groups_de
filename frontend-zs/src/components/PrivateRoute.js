import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authenticationService } from '../services';

export const SecureRoute = ({ component: Component }) => (
  <Route render={props => {
    const currentUser = authenticationService.currentUser;
    if (!currentUser) {
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }
    return <Component/>
  }} />
);
