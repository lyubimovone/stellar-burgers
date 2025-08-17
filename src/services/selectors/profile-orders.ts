import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectProfileOrders = (state: RootState): TOrder[] =>
  state.profileOrders.orders;

export const selectIsProfileOrdersLoading = (state: RootState): boolean =>
  state.profileOrders.isLoading;
