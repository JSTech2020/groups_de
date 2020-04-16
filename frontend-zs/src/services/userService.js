// import config from 'config';
import {handleResponse } from '../helpers/handleResponse';
import { authenticationService } from './authentication.service'
import axios from "axios";

export const userService = {
  getAll,
  changeEmail,
  changePassword
};

async function getAll() {
  try {
   /* const loginCredentials = {
      email: username,
      password: password
    };
    const config = {
      headers: {
        Authorization: authHeader()
      }
    };*/
    const response = await axios.get('http://localhost:3001/api/users');
    handleResponse(response);
  } catch (e) {
    console.log(e);
  }
}

async function changeEmail({email, emailConfirmation, currentPassword}) {
  try {

    const response = await axios.put('http://localhost:3001/api/users/edit/email/' + authenticationService.currentUserValue.user._id, {email, emailConfirmation, currentPassword });
    const authToken = response.data.authToken;
    localStorage.setItem('authToken', JSON.stringify(authToken));
    authenticationService.updateToken(authToken);
  }
  catch (e) {
    if(e.status === 400){
      throw new Error ('either email or password is incorrect');
    }
    console.log(e);
  }
}

async function changePassword({emailConfirmation, passwordConfirmation, password}) {
  try {

    const response = await axios.put('http://localhost:3001/api/users/edit/password/' + authenticationService.currentUserValue.user._id, {emailConfirmation, passwordConfirmation, password });
    const authToken = response.data.authToken;
    localStorage.setItem('authToken', JSON.stringify(authToken));
    authenticationService.updateToken(authToken);
  }
  catch (e) {
    if(e.status === 400){
      throw new Error ('either email or password is incorrect');
    }
    console.log(e);
  }
}