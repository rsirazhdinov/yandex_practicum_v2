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
