const BASE_URL = 'http://localhost:3000/';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

const request = (endpoint, method, body, jwt) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const fetchInit = {
    method,
    headers: jwt
      ? {
          ...headers,
          Authorization: `Bearer ${jwt}`,
        }
      : headers,
  };

  return fetch(
    `${BASE_URL}/${endpoint}`,
    body
      ? {
          ...fetchInit,
          body: JSON.stringify(body),
        }
      : fetchInit
  ).then(handleResponse);
};

export const login = (authData) => {
  return request('auth/token/login', 'POST', authData);
};

export const register = (authData) => {
  return request('auth/token/register', 'POST', authData);
};

export const logout = (authData) => {
  return request('users/', 'POST', authData);
};

export const checkToken = (jwt) => {
  return request('users/me', 'GET', null, jwt);
};
