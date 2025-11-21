// import { IFeedActions } from "../actions/feed";
// import { TOrder } from "../types/feed";

// export type TFeedState = {
//     orders: Array<TOrder>;
//     total: number;
//     totalToday: number;
//     error: string | null;

// }

// const initialState: TFeedState = {
//     orders: [],
//     total: 0,
//     totalToday: 0,
//     error: null
// }

// export const FeedReducer = (state = initialState, action: IFeedActions): TFeedState => {
//     switch(action.type){
//         case "FEED_ON_ERROR": {
//             return {...state, error: action.payload}
//         }
//         case "FEED_ON_MESSAGE": {
//             return {...state, total: action.payload.total, totalToday: action.payload.totalToday, orders: action.payload.orders, }
//         }
//         default: {
//             return state
//         }
//     }
// }

import { createSlice } from '@reduxjs/toolkit';

import { onErrorFeed, onMessageFeed } from '../actions/feed';

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
// export type LiveTableState = {
//     status: WebsocketStatus;
//     table: LiveTable;
//     error: string | null;
// }

// const initialState: LiveTableState = {
//     status: WebsocketStatus.OFFLINE,
//     table: [],
//     error: null,
// }

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
