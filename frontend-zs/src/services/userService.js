import { authenticationService } from './authentication.service'
import axios from "axios";
import { async } from 'rxjs/internal/scheduler/async';

export const userService = {
  getAll,
  signUp,
  updateUser,
  validatePassword,
  verifyUser,
  deleteUser
};

async function getAll() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/users`);
  } catch (e) {
    console.log(e);
  }
}

async function signUp(signUpCredentials) {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup`, signUpCredentials);
  } catch (e) {
    console.log(e);
  }
}

async function updateUser(updatedUser) {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    const response = await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
      + '/api/users/' + currentUserId, updatedUser);
    authenticationService.setAuthToken(response.data.authToken);
    return response;
  } catch (e) {
    return e;
  }
}

async function validatePassword(user) {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    const response = await axios.post("http://localhost:3001"
      + '/api/users/' + currentUserId, user);
    return response;
  } catch (e) {
    return e;
  }
}

async function verifyUser(token) {
  try {
    return await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup/verify/` + token);
  } catch (e) {
    console.log(e);
  }
}

async function deleteUser() {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    await axios.delete(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
      + '/api/users/' + currentUserId);
    authenticationService.logout();
  } catch (e) {
    console.log(e);
  }
}
