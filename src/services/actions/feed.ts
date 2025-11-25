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
