import { request } from './url';

export async function login(username, password) {
  return await request('login', 'POST', {username, password}, '', 'application/json');
}

export async function signup(username, email, password) {
  return await request('signup', 'POST', {username, email, password}, '', 'application/json');
}

export async function signupConfirm(username, confirmationCode) {
  return await request('signup/confirm', 'POST', {username, confirmationCode}, '', 'application/json');
}

export async function getEvents(token) {
  return await request('event', 'GET', '', token, 'application/json');
}

export async function getMasters(token) {
  return await request('master', 'GET', '', token, 'application/json');
}

export async function getImage(token, fileName) {
  return await request('images/'+fileName, 'GET', '', token, 'image/jpeg');
}