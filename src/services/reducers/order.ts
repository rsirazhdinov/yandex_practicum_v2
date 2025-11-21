import {
  SAVE_ORDER_FAILED,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../constants/order';

import type { TSaveOrder } from '@/utils/types';

import type { TOrdersActions } from '../actions/order';
import type { TOrder } from '../types/feed';

type TOrderState = {
  saveOrderData: TSaveOrder | null;
  saveOrderRequest: boolean;
  saveOrderFailed: boolean;
  getOrderData: TOrder | null;
  getOrderRequest: boolean;
  getOrderFailed: boolean;
};

const initialState: TOrderState = {
  saveOrderData: null,
  saveOrderRequest: false,
  saveOrderFailed: false,
  getOrderData: null,
  getOrderRequest: false,
  getOrderFailed: false,
};
export const saveOrderReducer = (
  state = initialState,
  action: TOrdersActions
): TOrderState => {
  switch (action.type) {
    case SAVE_ORDER_REQUEST: {
      return {
        ...state,
        saveOrderRequest: true,
        saveOrderData: null,
      };
    }
    case SAVE_ORDER_SUCCESS: {
      return {
        ...state,
        saveOrderRequest: false,
        saveOrderData: action.payload,
      };
    }
    case SAVE_ORDER_FAILED: {
      return {
        ...state,
        saveOrderRequest: false,
        saveOrderFailed: true,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        getOrderRequest: true,
        getOrderData: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        getOrderRequest: false,
        getOrderData: action.payload,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
