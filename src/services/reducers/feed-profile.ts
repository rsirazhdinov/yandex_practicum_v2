import { createSlice } from '@reduxjs/toolkit';

import { onErrorFeedProfile, onMessageFeedProfile } from '../actions/feed-profile';

import type { TOrder } from '../types/feed';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const feedProfileSlice = createSlice({
  name: 'FeedProfile',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeed: (state) => state.orders,
    getTotalFeed: (state) => state.total,
    getTotalTodayFeed: (state) => state.totalToday,
    getFeedError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onErrorFeedProfile, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onMessageFeedProfile, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});

export const { getOrdersFeed, getTotalFeed, getTotalTodayFeed, getFeedError } =
  feedProfileSlice.selectors;
