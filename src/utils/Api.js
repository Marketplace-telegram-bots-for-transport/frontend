const url = 'http://localhost:3000/';
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

// eslint-disable-next-line no-shadow
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function register(email, username, password) {
  return request(`${url}/api/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  });
}

export function authorize(password, username) {
  return request(`${url}/api/auth/token/login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, username }),
  });
}

export function checkToken(token) {
  return request(`${url}/api/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
}
