import { onErrorFeedProfile, onMessageFeedProfile } from '../actions/feed-profile';
import { feedProfileSlice, initialState } from './feed-profile';

import type { TFeedAction } from '../types/feed';

const feedAction: TFeedAction = {
  success: true,
  orders: [
    {
      ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
      _id: '',
      status: 'done',
      number: 1,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
      name: 'asas',
    },
    {
      ingredients: ['60d3463f7034a000269f45e9'],
      _id: '',
      status: 'done',
      number: 3,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
      name: 'asas',
    },
  ],
  total: 2,
  totalToday: 2,
};

describe('feedProfileSlice reducer', () => {
  it('onErrorFeed', () => {
    const action = { type: onErrorFeedProfile.type, payload: 'Error' };
    const state = feedProfileSlice.reducer(undefined, action);
    expect(state).toEqual({ ...initialState, error: 'Error' });
  });

  it('onMessageFeed', () => {
    const action = { type: onMessageFeedProfile.type, payload: feedAction };
    const state = feedProfileSlice.reducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      orders: feedAction.orders,
      total: feedAction.total,
      totalToday: feedAction.totalToday,
    });
  });
});
