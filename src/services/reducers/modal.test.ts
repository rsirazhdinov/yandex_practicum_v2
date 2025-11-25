import { ADD_MODAL_DATA, DELETE_MODAL_DATA } from '../constants/modal';
import { initialState, modalReducer } from './modal';

import type { TIngredient } from '@/utils/types';

const ingredient: TIngredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: '0',
  _id: '643d69a5c3f7b9001cfa093c',
};

describe('modal reducer', () => {
  it('initializes correctly', () => {
    const state = modalReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('add modal data', () => {
    const action = { type: ADD_MODAL_DATA, payload: ingredient };
    const state = modalReducer(initialState, action);
    expect(state).toEqual({ ...initialState, data: ingredient });
  });

  it('delete modal data', () => {
    const prevState = { ...initialState, data: ingredient };
    const action = { type: DELETE_MODAL_DATA };
    const state = modalReducer(prevState, action);
    expect(state).toEqual(initialState);
  });
});
