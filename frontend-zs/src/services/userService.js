// import config from 'config';
import axios from "axios";

export const userService = {
  getAll,
  signUp
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
    const response = await axios.post(`${process.env.REACT_APP_API_URL}:
      ${process.env.REACT_APP_API_PORT}/api/signup`, signUpCredentials);
  } catch (e) {
    console.log(e);
  }
}
