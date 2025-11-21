import type { TIngredient } from '@/utils/types';
import type { UnknownAction } from 'redux';

import type { ADD_MODAL_DATA, DELETE_MODAL_DATA } from '../constants/modal';

export type IAddModalData = {
  readonly type: typeof ADD_MODAL_DATA;
  readonly payload: TIngredient;
};

export type IDeleteModalData = {
  readonly type: typeof DELETE_MODAL_DATA;
};

export type TModalActions = IAddModalData | IDeleteModalData | UnknownAction;
