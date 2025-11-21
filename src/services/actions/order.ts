import { saveOrder, getOrder } from '../../utils/api.js';
import {
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from '../constants/order.js';

import type { TSaveOrder } from '@/utils/types.js';

import type { AppDispatchCustom, AppThunk } from '../store.js';
import type { TOrder } from '../types/feed.js';

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

export type IGetOrderRequest = {
  readonly type: typeof GET_ORDER_REQUEST;
};

export type IGetOrderSuccess = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: TOrder;
};

export type IGetOrderFaild = {
  readonly type: typeof GET_ORDER_FAILED;
};

export type TOrdersActions =
  | ISaveOrderRequest
  | ISaveOrderSuccess
  | ISaveOrderFaild
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFaild;

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

export const getOrderAction = (orderId: number): AppThunk => {
  return function (dispatch: AppDispatchCustom) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrder(orderId)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res.orders[0],
        });
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
          payload: e,
        });
      });
  };
};
