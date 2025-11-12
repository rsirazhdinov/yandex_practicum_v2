import {
  SAVE_ORDER_FAILED,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
} from '../constants/order';

import type { TSaveOrder } from '@/utils/types';

import type { TOrdersActions } from '../actions/order';

type TOrderState = {
  saveOrderData: TSaveOrder | null;
  saveOrderRequest: boolean;
  saveOrderFailed: boolean;
};

const initialState: TOrderState = {
  saveOrderData: null,
  saveOrderRequest: false,
  saveOrderFailed: false,
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
    default: {
      return state;
    }
  }
};
