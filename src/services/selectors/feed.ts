import { RootState } from '../store';
import { TOrder, TOrdersData } from '@utils-types';
import { createSelector } from '@reduxjs/toolkit';

const selectFeed = (state: RootState) => state.feed;

export const selectFeedOrders = createSelector(
  [selectFeed],
  (feed): TOrder[] => feed.orders
);

export const selectFeedInfo = createSelector(
  [selectFeed],
  (feed): TOrdersData => ({
    orders: feed.orders,
    total: feed.total,
    totalToday: feed.totalToday
  })
);

export const selectIsFeedLoading = createSelector(
  [selectFeed],
  (feed): boolean => feed.isLoading
);
