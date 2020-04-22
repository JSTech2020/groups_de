// import config from 'config';
import { authenticationService } from './authentication.service'
import axios from "axios";

export const userService = {
  getAll,
  updateUser,
  validatePassword
};

async function getAll() {
  try {
    await axios.get('http://localhost:3001/api/users');
  } catch(e) {
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
