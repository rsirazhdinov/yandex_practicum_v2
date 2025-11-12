import {
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
} from '@services/constants/burger-constructor';

import type { TIngredient } from '@/utils/types';

import type { TBurgerConsctructorActions } from '../actions/burger-constructor';

type TIngredientWithId = TIngredient & { id: number };

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TIngredientWithId[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConsctructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_ITEM_CONSTRUCTOR: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload],
        };
      }
    }
    case DELETE_ITEM_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: state.ingredients.filter((item) => item.id !== action.payload),
      };
    }
    case MOVE_ITEM_CONSTRUCTOR: {
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.toIndex,
        0,
        ingredients.splice(action.payload.fromIndex, 1)[0]
      );
      return {
        ...state,
        ingredients: ingredients,
      };
    }
    default: {
      return state;
    }
  }
};
