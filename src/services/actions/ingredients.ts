import { fetchIngredients } from '../../utils/api';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants/ingredients';

import type { TIngredient } from '@/utils/types';

import type { AppDispatchCustom, AppThunk } from '../types';

export type IGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type IGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type IGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction;

export function getIngredients(): AppThunk {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetchIngredients()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}
