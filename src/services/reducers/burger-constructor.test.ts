import {
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
  RESET_ITEM_CONSTRUCTOR,
} from '../constants/burger-constructor';
import { burgerConstructorReducer, initialState } from './burger-constructor';

import type { TIngredient } from '@/utils/types';

const ingredientMain: TIngredient & { id: number } = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: '0',
  id: 545,
};

const ingredientBun: TIngredient & { id: number } = {
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
  id: 2323,
};

const ingredientSauce: TIngredient & { id: number } = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: '0',
  id: 888,
};

describe('burger constructor reduce', () => {
  it('initializes correctly', () => {
    const state = burgerConstructorReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('add item bun contructor', () => {
    const action = { type: ADD_ITEM_CONSTRUCTOR, payload: ingredientBun };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({ ...initialState, bun: ingredientBun });
  });

  it('add item ingredient contructor', () => {
    const action = { type: ADD_ITEM_CONSTRUCTOR, payload: ingredientMain };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, ingredientMain],
    });
  });

  it('delete item contructor', () => {
    const prevState = {
      ...initialState,
      bun: ingredientBun,
      ingredients: [...initialState.ingredients, ingredientMain],
    };
    const action = { type: DELETE_ITEM_CONSTRUCTOR, payload: 545 };
    const state = burgerConstructorReducer(prevState, action);
    expect(state).toEqual({ ...prevState, ingredients: [...initialState.ingredients] });
  });

  it('reset item contructor', () => {
    const action = { type: RESET_ITEM_CONSTRUCTOR };
    const state = burgerConstructorReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('move item contructor', () => {
    const prevState = {
      ...initialState,
      bun: ingredientBun,
      ingredients: [ingredientSauce, ingredientMain],
    };
    const action = {
      type: MOVE_ITEM_CONSTRUCTOR,
      payload: { fromIndex: 0, toIndex: 1 },
    };
    const state = burgerConstructorReducer(prevState, action);
    expect(state).toEqual({
      ...prevState,
      ingredients: [ingredientMain, ingredientSauce],
    });
  });
});
