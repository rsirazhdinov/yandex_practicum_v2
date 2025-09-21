import { saveOrder } from '@utils/burger-api.js';

export const SAVE_ORDER_REQUEST = 'SAVE_ORDER_REQUEST';
export const SAVE_ORDER_SUCCESS = 'SAVE_ORDER_SUCCESS';
export const SAVE_ORDER_FAILED = 'SAVE_ORDER_FAILED';

export const saveOrderAction = (ingredientsIdArr) => {
  return function (dispatch) {
    dispatch({
      type: SAVE_ORDER_REQUEST,
    });
    saveOrder(ingredientsIdArr)
      .then((res) => {
        console.log(res);
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
