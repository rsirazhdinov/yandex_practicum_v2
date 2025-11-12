import { ADD_ITEM_CONSTRUCTOR } from '../constants/burger-constructor';

import type { TIngredient } from '@/utils/types';

import type {
  DELETE_ITEM_CONSTRUCTOR,
  MOVE_ITEM_CONSTRUCTOR,
} from '../constants/burger-constructor';

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export type IAddItemConstructorAction = {
  readonly type: typeof ADD_ITEM_CONSTRUCTOR;
  readonly payload: TIngredient & { id: number };
};

export type IDeleteItemConstructorAction = {
  readonly type: typeof DELETE_ITEM_CONSTRUCTOR;
  readonly payload: number;
};

export type IMoveItemConstructorAction = {
  readonly type: typeof MOVE_ITEM_CONSTRUCTOR;
  readonly payload: {
    fromIndex: number;
    toIndex: number;
  };
};

export type TBurgerConsctructorActions =
  | IAddItemConstructorAction
  | IDeleteItemConstructorAction
  | IMoveItemConstructorAction;

export const addItemConstructor = (item: TIngredient): IAddItemConstructorAction => ({
  type: ADD_ITEM_CONSTRUCTOR,
  payload: { ...item, id: getRandomInt(1, 10000) },
});
