const url = 'http://80.87.96.7/api';

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

// eslint-disable-next-line camelcase
export function register(email, username, password, confirm_password) {
  return request(`${url}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    // eslint-disable-next-line camelcase
    body: JSON.stringify({ email, username, password, confirm_password }),
  });
}

export function authorize(password, username) {
  return request(`${url}/auth/token/login/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, username }),
  });
}

// eslint-disable-next-line camelcase
export function checkToken(auth_token) {
  return request(`${url}/api/users/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // eslint-disable-next-line camelcase
      Authorization: `Bearer ${auth_token}`,
    },
  });
}
