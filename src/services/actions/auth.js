import { authApi as apiAuth } from '@utils/api.js';

// export const SET_USER = 'SET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAILED = 'PATCH_USER_FAILED';

export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function login(form) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    apiAuth
      .login(form)
      .then((res) => {
        console.log(res);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  console.log('logout');
  return function (dispatch) {
    console.log('logout disp');
    dispatch({
      type: LOGOUT_REQUEST,
    });
    apiAuth
      .logout()
      .then(() => {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

export function register(form) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    apiAuth
      .register(form)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}

export function checkUserAuth() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    if (apiAuth.isTokenExists()) {
      apiAuth
        .getUser()
        .then((res) => {
          console.log(res);
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user,
          });
        })
        .catch((e) => {
          console.log(e);
          dispatch({
            type: GET_USER_FAILED,
          });
        })
        .finally(() => {
          dispatch({
            type: SET_IS_AUTH_CHECKED,
            payload: true,
          });
        });
    } else {
      dispatch({
        type: SET_IS_AUTH_CHECKED,
        payload: true,
      });
    }
  };
}

export function patchUser(form) {
  return function (dispatch) {
    dispatch({
      type: PATCH_USER_REQUEST,
    });
    apiAuth
      .patchUser(form)
      .then((data) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          payload: data.user,
        });
      })
      .catch((e) => {
        dispatch({
          type: PATCH_USER_FAILED,
          payload: e,
        });
      });
  };
}
