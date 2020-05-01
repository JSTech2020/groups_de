import { authenticationService } from './authentication.service'
import axios from "axios";
import { async } from 'rxjs/internal/scheduler/async';

export const userService = {
  signUp,
  updateUser,
  validatePassword,
  verifyUser,
  deleteUser
};

async function signUp(signUpCredentials) {
  try {
    return await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup`, signUpCredentials);
  } catch (error) {
    console.log(error.response);
    return Promise.reject(error.response);
  }
}

async function updateUser(updatedUser) {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    const response = await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
      + '/api/users/' + currentUserId, updatedUser);
    authenticationService.setAuthToken(response.data.authToken);
    return response;
  } catch (error) {
    return Promise.reject(error.response);
  }
}

async function validatePassword(user) {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    const response = await axios.post("http://localhost:3001"
      + '/api/users/' + currentUserId, user);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response);
  }
}

async function verifyUser(token) {
  try {
    return await axios.put(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup/verify/` + token);
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response);
  }
}

async function deleteUser() {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    await axios.delete(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`
      + '/api/users/' + currentUserId);
    authenticationService.logout();
  } catch (error) {
    console.log(error);
    return Promise.reject(error.response);
  }
}
