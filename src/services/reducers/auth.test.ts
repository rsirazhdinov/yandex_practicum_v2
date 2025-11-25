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
} from '../constants/auth';
import { authReducer, initialState } from './auth';

import type { TUser } from '@/utils/types';

const User: TUser = {
  email: 'test@mail.ru',
  name: 'test',
};

describe('auth reducer', () => {
  it('initializes correctly', () => {
    const state = authReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('get user request', () => {
    const action = { type: GET_USER_REQUEST };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      getUserRequest: true,
      getUserFailed: false,
    });
  });

  it('get user success', () => {
    const action = { type: GET_USER_SUCCESS, payload: User };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: User,
      getUserRequest: false,
    });
  });

  it('get user failed', () => {
    const action = { type: GET_USER_FAILED };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      getUserFailed: true,
    });
  });

  it('patch user request', () => {
    const action = { type: PATCH_USER_REQUEST };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      patchUserRequest: true,
      patchUserFailed: false,
    });
  });

  it('patch user success', () => {
    const action = { type: PATCH_USER_SUCCESS, payload: User };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: User,
      patchUserRequest: false,
    });
  });

  it('patch user failed', () => {
    const action = { type: PATCH_USER_FAILED };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      patchUserFailed: true,
    });
  });

  it('set is auth checked', () => {
    const action = { type: SET_IS_AUTH_CHECKED, payload: true };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it('login request', () => {
    const action = { type: LOGIN_REQUEST };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      loginRequest: true,
      loginFailed: false,
    });
  });

  it('login success', () => {
    const action = { type: LOGIN_SUCCESS, payload: User };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: User,
      loginRequest: false,
    });
  });

  it('login failed', () => {
    const action = { type: LOGIN_FAILED };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      loginFailed: true,
    });
  });

  it('logout request', () => {
    const action = { type: LOGOUT_REQUEST };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      logoutRequest: true,
      logoutFailed: false,
    });
  });

  it('logout success', () => {
    const action = { type: LOGOUT_SUCCESS };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      logoutRequest: false,
    });
  });

  it('logout failed', () => {
    const action = { type: LOGOUT_FAILED };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      logoutFailed: true,
    });
  });

  it('register request', () => {
    const action = { type: REGISTER_REQUEST };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      registerRequest: true,
      registerFailed: false,
    });
  });

  it('register success', () => {
    const action = { type: REGISTER_SUCCESS, payload: User };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: User,
      registerRequest: false,
    });
  });

  it('register failed', () => {
    const action = { type: REGISTER_FAILED };
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      registerFailed: true,
    });
  });
});
