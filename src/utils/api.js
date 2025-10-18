const BASE_URL = 'https://norma.nomoreparties.space/api/';

// создаем функцию проверки ответа на `ok`
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse).then(checkSuccess);
};

export const fetchIngredients = () => request('ingredients');

export const saveOrder = (ingredientsIdArr) =>
  fetchWithRefresh('orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify({
      ingredients: ingredientsIdArr,
    }),
  });

const refreshToken = async () => {
  const response = await request('/auth/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
};

const login = async (form) => {
  const response = await request('auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
};

const fetchWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
    // const result = await fetch(`${BASE_URL}${endpoint}`, options);
    // return await checkResponse(result);
  } catch (error) {
    if (error.message === 'jwt.expired') {
      const res = await refreshToken();
      options.headers.authorization = res.accessToken;
      return await request(endpoint, options);
      // const result = await fetch(`${BASE_URL}${endpoint}`, options);
      // return await checkResponse(result);
    } else {
      return Promise.reject(error);
    }
  }
};
const getUser = async () => {
  try {
    return await fetchWithRefresh('auth/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    });
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('removeToken');
    throw error;
  }
};

const patchUser = async (form) => {
  return await fetchWithRefresh('auth/user', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(form),
  });
};

const logout = async () => {
  return await request('auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('removeToken');
  });
};

const register = async (form) => {
  const response = await request('auth/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
  localStorage.setItem('accessToken', response.accessToken);
  localStorage.setItem('refreshToken', response.refreshToken);
  return response;
};

const isTokenExists = () => !!localStorage.getItem('accessToken');

export const authApi = {
  getUser,
  login,
  logout,
  register,
  isTokenExists,
  patchUser,
};

export const passwordForgot = (form) =>
  request('password-reset', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

export const passwordReset = (form) =>
  request('password-reset/reset', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
