import {
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SAVE_ORDER_FAILED,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
} from '../constants/order';
import { initialState, saveOrderReducer } from './order';

import type { TSaveOrder } from '@/utils/types';

import type { TOrder } from '../types/feed';

const saveOrder: TSaveOrder = {
  success: true,
  name: 'Традиционный-галактический антарианский краторный бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: '0',
      },
      {
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
        __v: '0',
      },
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        __v: '0',
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: '0',
      },
    ],
    _id: '6923274ea64177001b32059f',
    owner: {
      name: 'ruslan222',
      email: 'ruslan.sirazhdinov@mail.ru',
      createdAt: '2025-09-30T07:42:19.836Z',
      updatedAt: '2025-11-10T13:54:03.905Z',
    },
    status: 'done',
    name: 'Традиционный-галактический антарианский краторный бургер',
    createdAt: '2025-11-23T15:25:02.382Z',
    updatedAt: '2025-11-23T15:25:02.582Z',
    number: 95224,
    price: 2613,
  },
};

const order: TOrder = {
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0944',
    '643d69a5c3f7b9001cfa0945',
    '643d69a5c3f7b9001cfa093c',
  ],
  _id: '6923274ea64177001b32059f',
  status: 'done',
  number: 95224,
  updatedAt: '2025-11-23T15:25:02.382Z',
  createdAt: '2025-11-23T15:25:02.382Z',
  name: 'Традиционный-галактический антарианский краторный бургер',
};

describe('order reducer', () => {
  it('initializes correctly', () => {
    const state = saveOrderReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('save order request', () => {
    const action = { type: SAVE_ORDER_REQUEST };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      saveOrderRequest: true,
      saveOrderData: null,
    });
  });

  it('save order success', () => {
    const action = { type: SAVE_ORDER_SUCCESS, payload: saveOrder };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      saveOrderRequest: false,
      saveOrderData: saveOrder,
    });
  });

  it('save order failed', () => {
    const action = { type: SAVE_ORDER_FAILED, payload: saveOrder };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({ ...initialState, saveOrderFailed: true });
  });

  it('get order request', () => {
    const action = { type: GET_ORDER_REQUEST };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      getOrderRequest: true,
      getOrderData: null,
    });
  });

  it('get order success', () => {
    const action = { type: GET_ORDER_SUCCESS, payload: order };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      saveOrderRequest: false,
      getOrderData: order,
    });
  });

  it('get order failed', () => {
    const action = { type: GET_ORDER_FAILED };
    const state = saveOrderReducer(undefined, action);
    expect(state).toEqual({ ...initialState, getOrderFailed: true });
  });
});
