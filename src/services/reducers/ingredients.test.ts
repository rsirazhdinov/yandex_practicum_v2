import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../constants/ingredients';
import { getItemsReducer, initialState } from './ingredients';

import type { TIngredient } from '@/utils/types';

const ingredientsTest: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: '0',
  },
  {
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
  },
];

const ingredientsHashTest: Record<string, TIngredient> | null = {
  '643d69a5c3f7b9001cfa0941': {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: '0',
  },
  '643d69a5c3f7b9001cfa093e': {
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
  },
};

describe('ingredients reduce', () => {
  it('initializes correctly', () => {
    const state = getItemsReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('get ingredietns request', () => {
    const action = { type: GET_INGREDIENTS_REQUEST };
    const state = getItemsReducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredientsRequest: true });
  });

  it('get ingredietns success', () => {
    const action = { type: GET_INGREDIENTS_SUCCESS, payload: ingredientsTest };
    const state = getItemsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: ingredientsTest,
      ingredientsHash: ingredientsHashTest,
      ingredientsRequest: false,
    });
  });

  it('get ingredietns failed', () => {
    const action = { type: GET_INGREDIENTS_FAILED };
    const state = getItemsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: false,
    });
  });
});
