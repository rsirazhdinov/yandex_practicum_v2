// import { compose, createStore, applyMiddleware } from 'redux';
// import {getItemsReducer} from "@services/reducers/ingredients.js";
// // import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
//
// export const store = createStore(rootReducer, applyMiddleware(thunk));
// const initialState = {
//   ingregients: {
//     ingregients: []
//   }
// };
//
//
// export const store = configureStore({
//   reducer: {
//     ingredients: getItemsReducer,
//   },
//   preloadedState: initialState,
// });
// const store = configureStore({
//   reducer: rootReducer,
//   preloadedState: initialState,
// })
// export default store;
// export const configureStore = (initialState) => {
//     return createStore(
//         rootReducer,
//         initialState,
//         composeWithDevTools()
//     )
// }
// import { createStore, applyMiddleware } from 'redux';
// import { thunk } from 'redux-thunk';
//
//
// const store = createStore(rootReducer, applyMiddleware(thunk));
//
// export default store;
// const initialState = {
//   // Ваше начальное состояние
//   counter: 0,
// };
// function rootReducer(state = initialState, action) {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { ...state, counter: state.counter + 1 };
//     default:
//       return state;
//   }
// }
// import { thunk } from 'redux-thunk';

// import { getItemsReducer } from './reducers/ingredients';
// import { modalReducer } from './reducers/modal';
// import { burgerConstructorReducer } from './reducers/burger-constructor';
// import { saveOrderReducer } from './reducers/order';
// import { authReducer } from './reducers/auth';
// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const store = createStore(rootReducer, enhancer);

// export const store = configureStore(
//   reducer: {
//       ingredients: getItemsReducer,
//       modal: modalReducer,
//       burgerConstructor: burgerConstructorReducer,
//       order: saveOrderReducer,
//       auth: authReducer
//   })

//    export const store = configureStore({
//   reducer: {
//     ingredients: getItemsReducer,
//   }
// });

import { configureStore } from '@reduxjs/toolkit';

import { connectFeed, disconnectFeed, onErrorFeed, onMessageFeed } from './actions/feed';
import {
  connectFeedProfile,
  disconnectFeedProfile,
  onErrorFeedProfile,
  onMessageFeedProfile,
} from './actions/feed-profile';
import { socketMiddleware } from './middleware/socket-middleware';
import { rootReducer } from './reducers';

import type { Dispatch, ThunkAction } from '@reduxjs/toolkit';

import type { TAuthActions } from './actions/auth';
import type { TBurgerConsctructorActions } from './actions/burger-constructor';
import type { TIngredientsActions } from './actions/ingredients';
import type { TModalActions } from './actions/modals';
import type { TOrdersActions } from './actions/order';

const feedMiddleware = socketMiddleware({
  connect: connectFeed,
  disconnect: disconnectFeed,
  onMessage: onMessageFeed,
  onError: onErrorFeed,
});

const feedProfileMiddleware = socketMiddleware(
  {
    connect: connectFeedProfile,
    disconnect: disconnectFeedProfile,
    onMessage: onMessageFeedProfile,
    onError: onErrorFeedProfile,
  },
  true
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, feedProfileMiddleware);
  },
});

export type AppStore = typeof store;
// export type RootState = ReturnType<AppStore['getState']>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

type TApplicationActions =
  | TAuthActions
  | TBurgerConsctructorActions
  | TIngredientsActions
  | TModalActions
  | TOrdersActions;

export type AppDispatchCustom = Dispatch<TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;
