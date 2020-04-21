import axios from "axios";
import {authenticationService} from "./authentication.service";

export const userService = {
  getAll,
  updateUser
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
  } catch (e) {
    return e;
  }
}
