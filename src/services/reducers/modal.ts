import { ADD_MODAL_DATA, DELETE_MODAL_DATA } from '../constants/modal';

import type { TIngredient } from '@/utils/types';

import type { TModalActions } from '../actions/modals';

type TModalState = {
  data: TIngredient | null;
};

export const initialState: TModalState = {
  data: null,
};

export const modalReducer = (
  state = initialState,
  action: TModalActions
): TModalState => {
  switch (action.type) {
    case ADD_MODAL_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    case DELETE_MODAL_DATA: {
      return {
        ...state,
        data: null,
      };
    }
    default: {
      return state;
    }
  }
};
