// import config from 'config';
import { authHeader, handleResponse } from '@../helpers';
import axios from "axios";

export const userService = {
  getAll
};

async function getAll() {
  try {
    const loginCredentials = {
      email: username,
      password: password
    };
    const config = {
      headers: {
        Authorization: authHeader()
      }
    };
    const response = await axios.get('http://localhost:3001/api/users', config);
    handleResponse(response);
  } catch(e) {
    console.log(e);
  }
}
