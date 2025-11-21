import { combineReducers } from 'redux';

import { authReducer } from '@services/reducers/auth.js';
import { burgerConstructorReducer } from '@services/reducers/burger-constructor.js';
import { modalReducer } from '@services/reducers/modal.js';
import { saveOrderReducer } from '@services/reducers/order.js';

import { feedSlice } from './feed';
import { feedProfileSlice } from './feed-profile';
import { getItemsReducer } from './ingredients';

// export const rootReducer = combineReducers({
//     getItemsReducer
// })

export const rootReducer = combineReducers({
  ingredients: getItemsReducer,
  modal: modalReducer,
  burgerConstructor: burgerConstructorReducer,
  order: saveOrderReducer,
  auth: authReducer,
  feed: feedSlice.reducer,
  feedProfile: feedProfileSlice.reducer,
});

// export const rootReducer = combineSlices({
//   ingredients: getItemsReducer,
//   modal: modalReducer,
//   burgerConstructor: burgerConstructorReducer,
//   order: saveOrderReducer,
//   auth: authReducer,
// });
