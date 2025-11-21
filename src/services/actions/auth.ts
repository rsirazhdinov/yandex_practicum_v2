import { authApi as apiAuth } from '@utils/api.js';

import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  SET_IS_AUTH_CHECKED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constants/auth';

import type { TUser } from '@/utils/types';

import type { AppDispatchCustom, AppThunk } from '../store';

export type IGetUserRequest = {
  readonly type: typeof GET_USER_REQUEST;
};

export type IGetUserSuccess = {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
};

export type IGetUserFailed = {
  readonly type: typeof GET_USER_FAILED;
};

export type IPatchUserRequest = {
  readonly type: typeof PATCH_USER_REQUEST;
};

export type IPatchUserSuccess = {
  readonly type: typeof PATCH_USER_SUCCESS;
  readonly payload: TUser;
};

export type IPatchUserFailed = {
  readonly type: typeof PATCH_USER_FAILED;
};

export type ISetIsAuthChecked = {
  readonly type: typeof SET_IS_AUTH_CHECKED;
  readonly payload: boolean;
};

export type ILoginRequest = {
  readonly type: typeof LOGIN_REQUEST;
};

export type ILoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TUser;
};

export type ILoginFailed = {
  readonly type: typeof LOGIN_FAILED;
};

export type ILogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST;
};

export type ILogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS;
};

export type ILogoutFailed = {
  readonly type: typeof LOGOUT_FAILED;
};

export type IRegisterRequest = {
  readonly type: typeof REGISTER_REQUEST;
};

export type IRegisterSuccess = {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
};

export type IRegisterFailed = {
  readonly type: typeof REGISTER_FAILED;
};

export type TAuthActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IPatchUserRequest
  | IPatchUserSuccess
  | IPatchUserFailed
  | ISetIsAuthChecked
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed;

type TLoginForm = {
  email: string;
  password: string;
};
export function login(form: TLoginForm): AppThunk {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    apiAuth
      .login(form)
      .then((res) => {
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

export function logout(): AppThunk {
  return function (dispatch: AppDispatchCustom) {
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

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};
export function register(form: TRegisterForm): AppThunk {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    apiAuth
      .register(form)
      .then((res) => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.user,
        });
      })
      .catch(() => {
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
}

export function checkUserAuth(): AppThunk {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    if (apiAuth.isTokenExists()) {
      apiAuth
        .getUser()
        .then((res) => {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user,
          });
        })
        .catch(() => {
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

type TPatchUserForm = {
  name: string;
  email: string;
  password: string;
};
export function patchUser(form: TPatchUserForm): AppThunk {
  return function (dispatch: AppDispatchCustom) {
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
