import { combineReducers } from 'redux';

import { burgerConstructorReducer } from '@services/reducers/burger-constructor.js';
import { modalReducer } from '@services/reducers/modal.js';
import { saveOrderReducer } from '@services/reducers/order.js';

import { getItemsReducer } from './ingredients';

// export const rootReducer = combineReducers({
//     getItemsReducer
// })

export const rootReducer = combineReducers({
  ingredients: getItemsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: saveOrderReducer,
});
