import { ADD_MODAL_DATA, DELETE_MODAL_DATA } from '@services/actions/modal.js';

const initialState = {
  data: null,
};

export const modalReducer = (state = initialState, action) => {
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
