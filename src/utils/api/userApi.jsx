const BASE_URL = 'http://localhost:3000/';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

const request = (endpoint, method, body) => {
  const fetchInit = {
    method,
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

export const getUserInfo = () => {
  return request('users/me', 'GET');
};

export const updateUserInfo = (userData) => {
  return request('users/me', 'PATCH', userData);
};

export const deleteUser = (userData) => {
  return request('users/me', 'DELETE', userData);
};

export const resetPassword = (email) => {
  return request('users/reset_password', 'POST', email);
};

export const setPassword = (userData) => {
  return request('users/set_password', 'POST', userData);
};

export const getShoppingCartUser = (userId, userData) => {
  return request(`users/${userId}/shopping_cart`, 'POST', userData);
};
