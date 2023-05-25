const url = 'https://d94o460neg.execute-api.us-east-1.amazonaws.com/api/';

export async function login(username, password) {
  const response = await fetch(url + 'login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return response;
}

export async function signup(username, email, password) {
  const response = await fetch(url + 'signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  return response;
}

export async function signupConfirm(username, confirmationCode) {
  const response = await fetch(url + 'signup/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, confirmationCode }),
  });
  return response;
}

export async function getEvents(token) {
  const response = await fetch(url + 'event', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
}
