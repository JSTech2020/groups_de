import { BehaviorSubject } from 'rxjs';
import jwt from 'jwt-decode';
import axios from "axios";
import React from "react";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('authToken')));

(function () {
  const authToken = currentUserSubject.value;
  axios.defaults.headers.common['Authorization'] = authToken ? `Bearer ${authToken}` : null;
}());

export const authenticationService = {
  login,
  logout,
  setAuthToken,
  currentUser: currentUserSubject.asObservable(),
  isAuthenticated,
  get currentUserValue() {
    const userValue = currentUserSubject.value;
    return userValue === null ? null : jwt(userValue).user;
  }
};

function isAuthenticated() {
  return currentUserSubject.value !== null;
}

async function login(username, password) {
  try {
    const loginCredentials = {
      email: username,
      password: password
    };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
                                           + '/api/login', loginCredentials);
    const authToken = response.data.authToken;
    setAuthToken(authToken);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response);
  }
}

function setAuthToken(authToken) {
  localStorage.setItem('authToken', JSON.stringify(authToken));
  currentUserSubject.next(authToken);
}

function logout() {
  localStorage.removeItem('authToken');
  currentUserSubject.next(null);
}
