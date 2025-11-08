import type {
  TAuthToken,
  TGetUser,
  TIngredients,
  TLogin,
  TLogut,
  TSaveOrder,
} from './types';

const BASE_URL = 'https://norma.education-services.ru/api/';

/* // создаем функцию проверки ответа на `ok`
const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

interface HaveSuccess {
  success: boolean;
}

// создаем функцию проверки на `success`
const checkSuccess = <T extends HaveSuccess>(res: T): T | Promise<T> => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <T extends HaveSuccess>(endpoint: string, options?: object): Promise<T> => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse<T>).then(checkSuccess<T>);
}; */

// создаем функцию проверки ответа на `ok`
const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json().then();
  }

  try {
    const json = await res.json();
    throw new Error(`Ошибка ${json.message}`);
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error(`Ошибка ${res.status}`);
    }

    throw e;
  }
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...options?.headers,
  };

  const init = {
    method: 'GET',
    ...options,
  };

  init.headers = headers;

  return fetch(`${BASE_URL}${endpoint}`, init).then(checkResponse<T>);
};

export const fetchIngredients = (): Promise<TIngredients> =>
  request<TIngredients>('ingredients');

export const saveOrder = (ingredientsIdArr: string[]): Promise<TSaveOrder> =>
  fetchWithRefresh<TSaveOrder>('orders', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify({
      ingredients: ingredientsIdArr,
    }),
  });

const refreshToken = async (): Promise<TAuthToken> => {
  const response = await request<TAuthToken>('/auth/token', {
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

type TFormLogin = {
  name: string;
  password: string;
};

const login = async (form: TFormLogin): Promise<TLogin> => {
  const response = await request<TLogin>('auth/login', {
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

const fetchWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
    // const result = await fetch(`${BASE_URL}${endpoint}`, options);
    // return await checkResponse(result);
  } catch (error) {
    if (error === 'jwt.expired') {
      const res = await refreshToken();
      if (options.headers) {
        const currentHeaders = new Headers(options.headers);
        currentHeaders.set('Authorization', res.accessToken);
        options.headers = currentHeaders;
      }

      return await request<T>(endpoint, options);
      // const result = await fetch(`${BASE_URL}${endpoint}`, options);
      // return await checkResponse(result);
    } else {
      throw error;
    }
  }
};

const getUser = async (): Promise<TGetUser> => {
  try {
    return await fetchWithRefresh<TGetUser>('auth/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') || '',
      },
    });
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('removeToken');
    throw error;
  }
};

type TPatchUserForm = {
  name: string;
  email: string;
  password: string;
};
const patchUser = async (form: TPatchUserForm): Promise<TGetUser> => {
  return await fetchWithRefresh<TGetUser>('auth/user', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify(form),
  });
};

const logout = async (): Promise<TLogut> => {
  return await request<TLogut>('auth/logout', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then((res) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('removeToken');
    return res;
  });
};

const register = async (form: TPatchUserForm): Promise<TLogin> => {
  const response = await request<TLogin>('auth/register', {
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

const isTokenExists = (): boolean => !!localStorage.getItem('accessToken');

export const authApi = {
  getUser,
  login,
  logout,
  register,
  isTokenExists,
  patchUser,
};

export const passwordForgot = (form: { email: string }): Promise<TLogut> =>
  request<TLogut>('password-reset', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

export const passwordReset = (form: {
  password: string;
  token: string;
}): Promise<TLogut> =>
  request<TLogut>('password-reset/reset', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });
