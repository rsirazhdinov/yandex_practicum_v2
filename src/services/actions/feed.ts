// import type {
//   FEED_CONNECT,
//   FEED_DISCONNECT,
//   FEED_ON_CLOSE,
//   FEED_ON_ERROR,
//   FEED_ON_MESSAGE,
//   FEED_ON_OPEN,
//   FEED_СONNECTION,
// } from '../constants/feed';
// import type { TFeedAction } from '../types/feed';

// export type IFeedConnect = {
//   readonly type: typeof FEED_CONNECT;
//   readonly payload: string;
// };

// export type IFeedDisconnect = {
//   readonly type: typeof FEED_DISCONNECT;
// };

// export type IFeedOnClose = {
//   readonly type: typeof FEED_ON_CLOSE;
// };

// export type IFeedOnOpen = {
//   readonly type: typeof FEED_ON_OPEN;
// };

// export type IFeedOnError = {
//   readonly type: typeof FEED_ON_ERROR;
//   readonly payload: string;
// };

// export type IFeedConnecting = {
//   readonly type: typeof FEED_СONNECTION;
// };

// export type IFeedOnMessage = {
//   readonly type: typeof FEED_ON_MESSAGE;
//   readonly payload: TFeedAction;
// };

// export type IFeedActions =
//   | IFeedConnect
//   | IFeedConnecting
//   | IFeedDisconnect
//   | IFeedOnClose
//   | IFeedOnError
//   | IFeedOnMessage
//   | IFeedOnOpen;

import { createAction } from '@reduxjs/toolkit';

import type { TFeedAction } from '../types/feed';

export const connectFeed = createAction<string, 'feed/connect'>('feed/connect');
export const disconnectFeed = createAction('feed/disconnect');

export const onMessageFeed = createAction<TFeedAction, 'feed/onmessage'>(
  'feed/onmessage'
);
export const onErrorFeed = createAction<string, 'feed/onerror'>('feed/onerror');

export type FeedActionTypes =
  | ReturnType<typeof connectFeed>
  | ReturnType<typeof disconnectFeed>
  | ReturnType<typeof onMessageFeed>
  | ReturnType<typeof onErrorFeed>;
