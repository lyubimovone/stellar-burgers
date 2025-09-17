import { RootState } from '../store';

export const getProfileOrdersState = (state: RootState) => state.profileOrders;
export const getProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const getProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.loading;
export const getProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;
