import { createAction } from '@reduxjs/toolkit';

import type { TFeedAction } from '../types/feed';

export const connectFeedProfile = createAction<string, 'feedprofile/connect'>(
  'feedprofile/connect'
);
export const disconnectFeedProfile = createAction('feedprofile/disconnect');

export const onMessageFeedProfile = createAction<TFeedAction, 'feedprofile/onmessage'>(
  'feedprofile/onmessage'
);
export const onErrorFeedProfile = createAction<string, 'feedprofile/onerror'>(
  'feedprofile/onerror'
);

export type FeedProfileActionTypes =
  | ReturnType<typeof connectFeedProfile>
  | ReturnType<typeof disconnectFeedProfile>
  | ReturnType<typeof onMessageFeedProfile>
  | ReturnType<typeof onErrorFeedProfile>;
