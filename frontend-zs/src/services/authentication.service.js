import { BehaviorSubject } from 'rxjs';
import jwt from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { handleResponse } from '../helpers/handleResponse';
import axios from "axios";
import {Redirect} from "react-router-dom";
import React from "react";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('authToken')));
export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    const userValue = currentUserSubject.value;
    if (userValue === null) return null;
    return jwt(userValue);
  }
};

async function login(username, password) {
  try {
    const loginCredentials = {
      email: username,
      password: password
    };
    const response = await axios.post('http://localhost:3001/api/login', loginCredentials);
    const authToken = response.data.authToken;
    localStorage.setItem('authToken', JSON.stringify(authToken));
    currentUserSubject.next(authToken);
  } catch (e) {
    console.log(e);
  }
}

function logout() {
  localStorage.removeItem('authToken');
  currentUserSubject.next(null);
}