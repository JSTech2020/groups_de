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
  get currentUserValue() {
    const userValue = currentUserSubject.value;
    return userValue === null ? null : jwt(userValue).user;
  }
};

async function login(username, password) {
  try {
    const loginCredentials = {
      email: username,
      password: password
    };
    const response = await axios.post("http://localhost:3001"
      + '/api/login', loginCredentials);
    const authToken = response.data.authToken;
    setAuthToken(authToken);
  } catch (e) {
    console.log(e);
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
