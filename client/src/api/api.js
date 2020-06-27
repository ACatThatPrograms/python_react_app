import { updateUserProfile, clearUserProfile } from 'redux/helpers/main';
const axios = require('axios');

async function _get(endpoint) {
  try {
    return await axios.get(endpoint)
  }
  catch (ex) {
    return {"err": "SEVER_RESPONSE_ERROR", "errMsg": "Error connecting to server! Please try again later."}
  }
}

async function _post(endpoint, data) {
  try {
    return await axios.post(endpoint, data)
  }
  catch (ex) {
    return {"err": "SEVER_RESPONSE_ERROR", "errMsg": "Error connecting to server! Please try again later."}
  }
}

///////////////////
// API Functions //
///////////////////

async function getAccount(props) {
  let res = await _get('/get-account');
  updateUserProfile(props, res)
  return res;
}

async function login(props, usernameOrEmail, password) {
  let res = await _post('/login', {"usernameOrEmail": usernameOrEmail, "password": password});
  updateUserProfile(props, res)
  return res;
}

async function logout(props) {
  let res = await _get('/logout');
  clearUserProfile(props)
  return res;
}

async function register(username, email, password) {
  return await _post('/register', {"username": username, "email": email, "password": password});
}

export default {
  getAccount : getAccount,
  login      : login,
  logout     : logout,
  register   : register,
}
