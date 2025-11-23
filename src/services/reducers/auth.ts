import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  PATCH_USER_FAILED,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_IS_AUTH_CHECKED,
} from '@services/constants/auth';

import type { TUser } from '@/utils/types';

import type { TAuthActions } from '../actions/auth';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  logoutRequest: boolean;
  logoutFailed: boolean;
  registerRequest: boolean;
  registerFailed: boolean;
  getUserRequest: boolean;
  getUserFailed: boolean;
  patchUserRequest: boolean;
  patchUserFailed: boolean;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  registerRequest: false,
  registerFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  patchUserRequest: false,
  patchUserFailed: false,
};
export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        getUserRequest: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        user: null,
        getUserFailed: true,
      };
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserFailed: false,
      };
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        patchUserRequest: false,
      };
    }
    case PATCH_USER_FAILED: {
      return {
        ...state,
        patchUserFailed: true,
        patchUserRequest: false,
      };
    }
    case SET_IS_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loginRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        logoutRequest: false,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        registerRequest: false,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
