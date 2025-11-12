import { saveOrder } from '../../utils/api.js';
import {
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILED,
} from '../constants/order.js';

import type { TSaveOrder } from '@/utils/types.js';

import type { AppDispatchCustom, AppThunk } from '../types/index.js';

export type ISaveOrderRequest = {
  readonly type: typeof SAVE_ORDER_REQUEST;
};

export type ISaveOrderSuccess = {
  readonly type: typeof SAVE_ORDER_SUCCESS;
  readonly payload: TSaveOrder;
};

export type ISaveOrderFaild = {
  readonly type: typeof SAVE_ORDER_FAILED;
};

export type TOrdersActions = ISaveOrderRequest | ISaveOrderSuccess | ISaveOrderFaild;

export const saveOrderAction = (ingredientsIdArr: (string | undefined)[]): AppThunk => {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: SAVE_ORDER_REQUEST,
    });
    saveOrder(ingredientsIdArr)
      .then((res) => {
        dispatch({
          type: SAVE_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((e) => {
        dispatch({
          type: SAVE_ORDER_FAILED,
          payload: e,
        });
      });
  };
};
