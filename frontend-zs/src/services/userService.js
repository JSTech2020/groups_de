// import config from 'config';
import { authenticationService } from './authentication.service'
import axios from "axios";

export const userService = {
  getAll,
  signUp,
  updateUser,
  validatePassword
};

async function getAll() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}:
      ${process.env.REACT_APP_API_PORT}/api/users`);
  } catch(e) {
    console.log(e);
  }
}

async function signUp(signUpCredentials) {
  try {
    console.log(`${process.env.REACT_APP_API_URL}:
    ${process.env.REACT_APP_API_PORT}/api/signup`);
    const response = await axios.post(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}/api/signup`, signUpCredentials);

    console.log(response)
    return response;
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
