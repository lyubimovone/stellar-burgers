import { RootState } from '../store';
import { TOrder } from '@utils-types';

export const selectOrderData = (state: RootState): TOrder | null =>
  state.order.order;

export const selectIsOrderRequest = (state: RootState): boolean =>
  state.order.orderRequest;
