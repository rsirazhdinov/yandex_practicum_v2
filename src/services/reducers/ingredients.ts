import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from '../constants/ingredients';

import type { TIngredient } from '@/utils/types';

import type { TIngredientsActions } from '../actions/ingredients';

type TIngredientsState = {
  ingredients: TIngredient[];
  ingredientsHash: Record<string, TIngredient> | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsHash: {},
  ingredientsRequest: false,
  ingredientsFailed: false,
};
export const getItemsReducer = (
  state = initialState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.payload,
        ingredientsHash: action.payload.reduce(
          (accumulator: Record<string, TIngredient>, currentObject: TIngredient) => {
            accumulator[currentObject._id] = currentObject;
            return accumulator;
          },
          {}
        ),
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
