// import config from 'config';
import { authenticationService } from './authentication.service'
import axios from "axios";

export const userService = {
  getAll,
  updateUser
};

async function getAll() {
  try {
    await axios.get('http://localhost:3001/api/users');
  } catch (e) {
    console.log(e);
  }
}

async function updateUser(updatedUser) {
  try {
    const currentUserId = authenticationService.currentUserValue._id;
    const response = await axios.put("http://localhost:3001"
                                          + '/api/users/' + currentUserId, updatedUser);
    authenticationService.setAuthToken(response.data.authToken);
  } catch (e) {
    return e;
  }
}