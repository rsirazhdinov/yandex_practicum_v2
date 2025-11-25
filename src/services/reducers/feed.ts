import { createSlice } from '@reduxjs/toolkit';

import { onErrorFeed, onMessageFeed } from '../actions/feed';

import type { TOrder } from '../types/feed';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const feedSlice = createSlice({
  name: 'Feed',
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
      .addCase(onErrorFeed, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onMessageFeed, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});

export const { getOrdersFeed, getTotalFeed, getTotalTodayFeed, getFeedError } =
  feedSlice.selectors;
