import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from "./PrivateRoute";

import { authenticationService } from '../services/authentication.service';

/**
 * This is a wrapper around PrivateRoute that allows only admins to enter certain routes
 */
export const PrivateAdminRoute = ({ path: Path, component: Component }) => (
  <Route render={props => {
    const currentUser = authenticationService.currentUserValue;
    if (!currentUser) return <Redirect to={{ pathname: '/login' }} />
    if (!currentUser.admin) {
        return <Redirect to={{ pathname: '/stories' }} />
      }
    return <PrivateRoute path={ Path } component={Component} />
  }} />
);
